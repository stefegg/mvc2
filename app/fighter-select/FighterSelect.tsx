"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Fighter, Team } from "../../types";
import { useGame } from "../../contexts/GameContext";
import { Button, AnimatedBorderDiv, FighterSelectCard } from "@/components";
import { createBattlePreview } from "../../utils";

interface FighterSelectProps {
  initialFighters: Fighter[];
}

const FighterSelect = ({ initialFighters }: FighterSelectProps) => {
  const searchParams = useSearchParams();
  const {
    fighters,
    setFighters,
    loadTeamsFromUrl,
    clearTeam,
    teamOne,
    teamTwo,
    getShareableUrl,
  } = useGame();

  const [teamOneReady, setTeamOneReady] = useState(false);
  const [teamTwoReady, setTeamTwoReady] = useState(false);
  const hasLoadedFromUrl = useRef(false);

  const cachedFighters = useMemo(() => {
    return fighters.length > 0 ? fighters : initialFighters;
  }, [fighters, initialFighters]);

  // Check if teams are full (3 fighters)
  const teamOneComplete = teamOne.length === 3;
  const teamTwoComplete = teamTwo.length === 3;
  const bothTeamsReady = teamOneReady && teamTwoReady;

  const handleTeamReady = (teamNumber: 1 | 2) => {
    if (teamNumber === 1) {
      setTeamOneReady(!teamOneReady);
    } else {
      setTeamTwoReady(!teamTwoReady);
    }
  };

  const handleCopyUrl = () => {
    const url = getShareableUrl();
    navigator.clipboard.writeText(url);
    alert("URL copied to clipboard!");
  };

  // Create battle preview when both teams are ready

  // Set fighters in context if not already set
  useEffect(() => {
    if (fighters.length === 0 && initialFighters.length > 0) {
      setFighters(initialFighters);
    }
  }, [fighters.length, initialFighters, setFighters]);

  // Handle URL-based team loading (only once)
  useEffect(() => {
    if (!hasLoadedFromUrl.current && fighters.length > 0) {
      const team1Param = searchParams.get("team1");
      const team2Param = searchParams.get("team2");

      if (team1Param || team2Param) {
        const team1Ids = team1Param ? team1Param.split(",") : [];
        const team2Ids = team2Param ? team2Param.split(",") : [];
        loadTeamsFromUrl(team1Ids, team2Ids);
        hasLoadedFromUrl.current = true;
      }
    }
  }, [fighters.length, searchParams, loadTeamsFromUrl]);

  const battlePreview = useMemo(() => {
    if (bothTeamsReady && teamOne.length === 3 && teamTwo.length === 3) {
      const teamOneObj: Team = {
        id: `team-one-${Date.now()}`,
        fighters: teamOne,
      };

      const teamTwoObj: Team = {
        id: `team-two-${Date.now()}`,
        fighters: teamTwo,
      };

      return createBattlePreview(teamOneObj, teamTwoObj);
    }
    return null;
  }, [bothTeamsReady, teamOne, teamTwo]);

  return (
    <>
      <h1 className="text-7xl italic text-center text-neo-blue mb-8 font-bold">
        Fighter Select
      </h1>
      <span className="grid grid-cols-12 grid-rows-[auto_auto] p-4">
        <div className="col-start-4 col-end-6 row-start-1 row-end-2">
          Team One:
          {teamOne.map((f) => (
            <div key={f.id}>{f.name}</div>
          ))}
        </div>
        <div className="col-start-4 col-end-6 row-start-2 row-end-3 flex flex-row justify-evenly gap-4">
          <AnimatedBorderDiv
            initialColor={teamOneComplete ? "#03DAc6" : "#666666"}
            hoverColor={teamOneComplete ? "#FFF700" : "#666666"}
            contentClassName={`${
              teamOneComplete
                ? "bg-neo-navy text-neo-blue"
                : "bg-gray-700 text-gray-400"
            }`}
          >
            <Button
              text={teamOneReady ? "Unready" : "Ready"}
              onClick={() => handleTeamReady(1)}
              disabled={!teamOneComplete}
            />
          </AnimatedBorderDiv>
          <AnimatedBorderDiv
            initialColor={
              !teamOneReady && teamOne.length > 0 ? "#FF6B6B" : "#666666"
            }
            hoverColor={
              !teamOneReady && teamOne.length > 0 ? "#FFF700" : "#666666"
            }
            contentClassName={`${
              !teamOneReady && teamOne.length > 0
                ? "bg-neo-navy text-neo-blue"
                : "bg-gray-700 text-gray-400"
            }`}
          >
            <Button
              text="Reset"
              onClick={() => clearTeam(1)}
              disabled={teamOneReady || teamOne.length === 0}
            />
          </AnimatedBorderDiv>
        </div>
        <div className="col-start-8 col-end-10 row-start-1 row-end-2">
          Team Two:
          {teamTwo.map((f) => (
            <div key={f.id}>{f.name}</div>
          ))}
        </div>
        <div className="col-start-8 col-end-10 row-start-2 row-end-3 flex flex-row justify-evenly gap-4">
          <AnimatedBorderDiv
            initialColor={teamTwoComplete ? "#03DAc6" : "#666666"}
            hoverColor={teamTwoComplete ? "#FFF700" : "#666666"}
            contentClassName={`${
              teamTwoComplete
                ? "bg-neo-navy text-neo-blue"
                : "bg-gray-700 text-gray-400"
            }`}
          >
            <Button
              text={teamTwoReady ? "Unready" : "Ready"}
              onClick={() => handleTeamReady(2)}
              disabled={!teamTwoComplete}
            />
          </AnimatedBorderDiv>
          <AnimatedBorderDiv
            initialColor={
              !teamTwoReady && teamTwo.length > 0 ? "#FF6B6B" : "#666666"
            }
            hoverColor={
              !teamTwoReady && teamTwo.length > 0 ? "#FFF700" : "#666666"
            }
            contentClassName={`${
              !teamTwoReady && teamTwo.length > 0
                ? "bg-neo-navy text-neo-blue"
                : "bg-gray-700 text-gray-400"
            }`}
          >
            <Button
              text="Reset"
              onClick={() => clearTeam(2)}
              disabled={teamTwoReady || teamTwo.length === 0}
            />
          </AnimatedBorderDiv>
        </div>
      </span>

      {bothTeamsReady && battlePreview && (
        <div className="text-center my-4">
          <h2 className="text-2xl text-neo-yellow mb-4">
            Battle Ready! Team Summaries:
          </h2>

          <div className="grid grid-cols-2 gap-8 mb-4">
            <div className="bg-neo-navy p-4 rounded-lg">
              <h3 className="text-neo-blue text-xl mb-2">Team One Summary</h3>
              <div className="text-neo-teal space-y-1">
                {battlePreview.teamOneSummary.team.fighters.map((fighter) => (
                  <div key={fighter.fighterId} className="mb-2">
                    <h4 className="text-neo-purple">{fighter.fighterName}</h4>
                    <p>Adjusted Logic: {fighter.adjustedStats.logic}</p>
                    <p>Adjusted Flow: {fighter.adjustedStats.flow}</p>
                    <p>Adjusted Chaos: {fighter.adjustedStats.chaos}</p>
                    <p>Advantages Over Opponent: {fighter.advantageCount}</p>
                  </div>
                ))}
                <p>
                  Total Adjusted Stats:
                  {battlePreview.teamOneSummary.totalPower}
                </p>
                <p className="text-sm">
                  Logic: {battlePreview.teamOneSummary.totalLogic} | Flow:{" "}
                  {battlePreview.teamOneSummary.totalFlow} | Chaos:{" "}
                  {battlePreview.teamOneSummary.totalChaos}
                </p>
                <p>
                  Total Advantages:
                  {battlePreview.teamOneSummary.totalAdvantages}
                </p>
                <p className="text-neo-yellow text-lg font-bold">
                  Win Chance: {battlePreview.teamOneSummary.winPercentage}%
                </p>
              </div>
            </div>

            <div className="bg-neo-navy p-4 rounded-lg">
              <h3 className="text-neo-blue text-xl mb-2">Team Two Summary</h3>
              <div className="text-neo-teal space-y-1">
                {battlePreview.teamTwoSummary.team.fighters.map((fighter) => (
                  <div key={fighter.fighterId} className="mb-2">
                    <h4 className="text-neo-purple">{fighter.fighterName}</h4>
                    <p>Adjusted Logic: {fighter.adjustedStats.logic}</p>
                    <p>Adjusted Flow: {fighter.adjustedStats.flow}</p>
                    <p>Adjusted Chaos: {fighter.adjustedStats.chaos}</p>
                    <p>Advantages Over Opponent: {fighter.advantageCount}</p>
                  </div>
                ))}
                <p>
                  Total Adjusted Stats:
                  {battlePreview.teamTwoSummary.totalPower}
                </p>
                <p className="text-sm">
                  Logic: {battlePreview.teamTwoSummary.totalLogic} | Flow:{" "}
                  {battlePreview.teamTwoSummary.totalFlow} | Chaos:{" "}
                  {battlePreview.teamTwoSummary.totalChaos}
                </p>
                <p>
                  Total Advantages:
                  {battlePreview.teamTwoSummary.totalAdvantages}
                </p>
                <p className="text-neo-yellow text-lg font-bold">
                  Win Chance: {battlePreview.teamTwoSummary.winPercentage}%
                </p>
              </div>
            </div>
          </div>

          <AnimatedBorderDiv
            initialColor="#03DAc6"
            hoverColor="#BB86FC"
            contentClassName="bg-neo-navy text-neo-teal"
          >
            <Button text="Copy Battle URL" onClick={handleCopyUrl} />
          </AnimatedBorderDiv>
        </div>
      )}

      <div className="grid grid-cols-4 gap-4">
        {cachedFighters.map((fighter) => (
          <FighterSelectCard key={fighter.id} fighter={fighter} />
        ))}
      </div>
    </>
  );
};

export default FighterSelect;
