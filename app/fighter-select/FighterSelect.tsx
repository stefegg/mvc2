"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { animate } from "motion";
import { Fighter } from "../../types";
import { useGame } from "../../contexts/GameContext";
import {
  AnimatedBorderButton,
  FighterSelectCard,
  BattlePreview,
} from "@/components";

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
    setTeam,
    addToTeam,
    teamOne,
    teamTwo,
  } = useGame();

  const [teamOneReady, setTeamOneReady] = useState(false);
  const [teamTwoReady, setTeamTwoReady] = useState(false);
  const hasLoadedFromUrl = useRef(false);
  const screenFlashRef = useRef<HTMLDivElement>(null);

  const cachedFighters = useMemo(() => {
    return fighters.length > 0 ? fighters : initialFighters;
  }, [fighters, initialFighters]);

  useEffect(() => {
    if (fighters.length === 0 && initialFighters.length > 0) {
      setFighters(initialFighters);
    }
  }, [fighters.length, initialFighters, setFighters]);

  useEffect(() => {
    if (!hasLoadedFromUrl.current && fighters.length > 0) {
      const team1Param = searchParams.get("team1");
      const team2Param = searchParams.get("team2");

      if (team1Param || team2Param) {
        const team1Ids = team1Param ? team1Param.split(",") : [];
        const team2Ids = team2Param ? team2Param.split(",") : [];
        loadTeamsFromUrl(team1Ids, team2Ids);
        hasLoadedFromUrl.current = true;
        setTeamOneReady(true);
        setTeamTwoReady(true);
      }
    }
  }, [fighters.length, searchParams, loadTeamsFromUrl]);

  const teamOneComplete = teamOne.length === 3;
  const teamTwoComplete = teamTwo.length === 3;

  const triggerFlash = () => {
    if (screenFlashRef.current) {
      animate(screenFlashRef.current, { opacity: 1 }, { duration: 0.3 }).then(
        () => {
          animate(screenFlashRef.current!, { opacity: 0 }, { duration: 0.6 });
        }
      );
    }
  };

  const handleTeamReady = (teamNumber: 1 | 2) => {
    triggerFlash();
    if (teamNumber === 1) {
      setTeamOneReady((prev) => !prev);
    } else {
      setTeamTwoReady((prev) => !prev);
    }
  };

  const generateRandomTeam = (teamNumber: 1 | 2) => {
    const otherTeam = teamNumber === 1 ? teamTwo : teamOne;

    const availableFighters = cachedFighters.filter(
      (fighter) => !otherTeam.find((f) => f.id === fighter.id)
    );

    const shuffled = [...availableFighters].sort(() => Math.random() - 0.5);
    const randomTeam = shuffled.slice(0, 3);

    setTeam(randomTeam, teamNumber);

    triggerFlash();
  };

  return (
    <>
      {/* Screen flash overlay */}
      <div
        ref={screenFlashRef}
        className="fixed inset-0 z-50 pointer-events-none opacity-0"
        style={{ backgroundColor: "white" }}
      />

      {teamOneReady && teamTwoReady ? (
        <BattlePreview onTeamReadyToggle={handleTeamReady} />
      ) : (
        <>
          <h1 className="text-7xl italic text-center text-neo-blue mb-8 font-bold">
            Select Your Fighters
          </h1>
          <span className="grid grid-cols-12 grid-rows-[auto_auto] p-4">
            <div className="col-start-4 col-end-6 row-start-1 row-end-2">
              Team One:
              {teamOne.map((f) => (
                <div key={f.id}>{f.name}</div>
              ))}
            </div>
            <div className="col-start-4 col-end-6 row-start-2 row-end-3 flex flex-row justify-evenly gap-2">
              <AnimatedBorderButton
                text={teamOneReady ? "Unready" : "Ready"}
                onClick={() => handleTeamReady(1)}
                disabled={!teamOneComplete}
                initialColor={teamOneComplete ? "#03DAc6" : "#666666"}
                hoverColor={teamOneComplete ? "#FFF700" : "#666666"}
                contentClassName={`${
                  teamOneComplete
                    ? "bg-neo-navy text-neo-blue"
                    : "bg-gray-700 text-gray-400"
                }`}
              />
              <AnimatedBorderButton
                text="Reset"
                onClick={() => clearTeam(1)}
                disabled={teamOne.length === 0 || teamOneReady}
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
              />
              <AnimatedBorderButton
                text="Random"
                onClick={() => generateRandomTeam(1)}
                initialColor="#03DAc6"
                hoverColor="#FFF700"
                contentClassName="bg-neo-navy text-neo-blue"
              />
            </div>
            <div className="col-start-8 col-end-10 row-start-1 row-end-2">
              Team Two:
              {teamTwo.map((f) => (
                <div key={f.id}>{f.name}</div>
              ))}
            </div>
            <div className="col-start-8 col-end-10 row-start-2 row-end-3 flex flex-row justify-evenly gap-2">
              <AnimatedBorderButton
                text={teamTwoReady ? "Unready" : "Ready"}
                onClick={() => handleTeamReady(2)}
                disabled={!teamTwoComplete}
                initialColor={teamTwoComplete ? "#03DAc6" : "#666666"}
                hoverColor={teamTwoComplete ? "#FFF700" : "#666666"}
                contentClassName={`${
                  teamTwoComplete
                    ? "bg-neo-navy text-neo-blue"
                    : "bg-gray-700 text-gray-400"
                }`}
              />
              <AnimatedBorderButton
                text="Reset"
                onClick={() => clearTeam(2)}
                disabled={teamTwo.length === 0 || teamTwoReady}
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
              />
              <AnimatedBorderButton
                text="Random"
                onClick={() => generateRandomTeam(2)}
                initialColor="#03DAc6"
                hoverColor="#FFF700"
                contentClassName="bg-neo-navy text-neo-blue"
              />
            </div>
          </span>
          <div className="grid grid-cols-4 gap-4">
            {cachedFighters.map((fighter) => (
              <FighterSelectCard
                key={fighter.id}
                fighter={fighter}
                onAddToTeam={addToTeam}
                isInTeamOne={teamOne.some((f) => f.id === fighter.id)}
                isInTeamTwo={teamTwo.some((f) => f.id === fighter.id)}
                teamOneComplete={teamOneComplete}
                teamTwoComplete={teamTwoComplete}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default FighterSelect;
