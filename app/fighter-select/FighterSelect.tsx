"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Fighter } from "../../types";
import { useGame } from "../../contexts/GameContext";
import { useFlashAnimation } from "../../hooks/useFlashAnimation";
import { FighterSelectCard, BattlePreview, TeamSelectCard } from "@/components";

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
    removeFromTeam,
    teamOne,
    teamTwo,
  } = useGame();

  const [teamOneReady, setTeamOneReady] = useState(false);
  const [teamTwoReady, setTeamTwoReady] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const hasLoadedFromUrl = useRef(false);
  const { triggerFlash, flashRef } = useFlashAnimation();

  const cachedFighters = useMemo(() => {
    return fighters.length > 0 ? fighters : initialFighters;
  }, [fighters, initialFighters]);

  // Filter fighters by full name for search
  const isFilterMatch = (fighter: Fighter) => {
    if (!searchFilter.trim()) return true;
    return fighter.name.toLowerCase().includes(searchFilter.toLowerCase());
  };

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

  const handleTeamReady = (teamNumber: 1 | 2) => {
    if (teamNumber === 1) {
      setTeamOneReady((prevTeamOne) => !prevTeamOne);
    } else {
      setTeamTwoReady((prevTeamTwo) => !prevTeamTwo);
    }
  };

  useEffect(() => {
    if (teamOneReady && teamTwoReady) {
      triggerFlash();
    }
  }, [teamOneReady, teamTwoReady, triggerFlash]);

  const generateRandomTeam = (teamNumber: 1 | 2) => {
    const otherTeam = teamNumber === 1 ? teamTwo : teamOne;

    const availableFighters = cachedFighters.filter(
      (fighter) => !otherTeam.find((f) => f.id === fighter.id)
    );

    const shuffled = [...availableFighters].sort(() => Math.random() - 0.5);
    const randomTeam = shuffled.slice(0, 3);

    setTeam(randomTeam, teamNumber);
  };

  return (
    <>
      {/* Screen flash overlay */}
      <div
        ref={flashRef}
        className="fixed inset-0 z-50 pointer-events-none opacity-0 bg-white"
      />

      {teamOneReady && teamTwoReady ? (
        <BattlePreview onTeamReadyToggle={handleTeamReady} />
      ) : (
        <>
          <motion.h1
            className="text-7xl italic text-center mb-8 font-bold"
            initial={{ color: "#23d1f6" }} // neo-blue
            animate={{
              color: [
                "#23d1f6", // neo-blue
                "#ffffff", // white
                "#FFF700", // neo-yellow
                "#ffffff", // white
                "#23d1f6", // neo-blue (final)
              ],
            }}
            transition={{
              duration: 1.0,
              times: [0, 0.25, 0.5, 0.75, 1],
              ease: "easeInOut",
            }}
          >
            Select Your Fighters
          </motion.h1>
          
          {/* Search Filter */}
          <div className="mb-6 flex justify-center">
            <input
              type="text"
              placeholder="Search fighters by name..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="px-4 py-2 rounded-lg bg-neo-navy text-neo-blue border border-neo-teal focus:border-neo-yellow focus:outline-none w-80"
            />
          </div>

          <span className="flex flex-row gap-4">
            <TeamSelectCard
              team={teamOne}
              teamNo={1}
              teamReady={teamOneReady}
              handleTeamReady={handleTeamReady}
              clearTeam={clearTeam}
              generateRandomTeam={generateRandomTeam}
              removeFromTeam={removeFromTeam}
            />
            <div className="grid grid-cols-4 gap-4">
              {cachedFighters.map((fighter) => (
                <FighterSelectCard
                  key={fighter.id}
                  fighter={fighter}
                  onAddToTeam={addToTeam}
                  isInTeamOne={teamOne.some((f) => f.id === fighter.id)}
                  isInTeamTwo={teamTwo.some((f) => f.id === fighter.id)}
                  teamOneComplete={teamOne.length === 3}
                  teamTwoComplete={teamTwo.length === 3}
                  isGreyedOut={!isFilterMatch(fighter)}
                />
              ))}
            </div>
            <TeamSelectCard
              team={teamTwo}
              teamNo={2}
              teamReady={teamTwoReady}
              handleTeamReady={handleTeamReady}
              clearTeam={clearTeam}
              generateRandomTeam={generateRandomTeam}
              removeFromTeam={removeFromTeam}
              bgColor="bg-neo-navy"
            />
          </span>
        </>
      )}
    </>
  );
};

export default FighterSelect;
