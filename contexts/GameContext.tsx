"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Fighter } from "../types";

interface GameContextType {
  // Fighter data
  fighters: Fighter[];
  setFighters: (fighters: Fighter[]) => void;

  // Team selection
  teamOne: Fighter[];
  teamTwo: Fighter[];
  addToTeam: (fighter: Fighter, teamNumber: 1 | 2) => void;
  removeFromTeam: (fighterId: string, teamNumber: 1 | 2) => void;
  clearTeam: (teamNumber: 1 | 2) => void;

  // Team sharing via URL
  loadTeamsFromUrl: (teamOneIds: string[], teamTwoIds: string[]) => void;
  getShareableUrl: () => string;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider = ({ children }: GameProviderProps) => {
  const [fighters, setFighters] = useState<Fighter[]>([]);
  const [teamOne, setTeamOne] = useState<Fighter[]>([]);
  const [teamTwo, setTeamTwo] = useState<Fighter[]>([]);

  const addToTeam = (fighter: Fighter, teamNumber: 1 | 2) => {
    const setTeam = teamNumber === 1 ? setTeamOne : setTeamTwo;
    const currentTeam = teamNumber === 1 ? teamOne : teamTwo;

    if (
      currentTeam.length < 3 &&
      !currentTeam.find((f) => f.id === fighter.id)
    ) {
      setTeam([...currentTeam, fighter]);
    }
  };

  const removeFromTeam = (fighterId: string, teamNumber: 1 | 2) => {
    const setTeam = teamNumber === 1 ? setTeamOne : setTeamTwo;
    const currentTeam = teamNumber === 1 ? teamOne : teamTwo;

    setTeam(currentTeam.filter((f) => f.id !== fighterId));
  };

  const clearTeam = (teamNumber: 1 | 2) => {
    const setTeam = teamNumber === 1 ? setTeamOne : setTeamTwo;
    setTeam([]);
  };

  const loadTeamsFromUrl = (teamOneIds: string[], teamTwoIds: string[]) => {
    const teamOneFighters = fighters.filter((f) => teamOneIds.includes(f.id));
    const teamTwoFighters = fighters.filter((f) => teamTwoIds.includes(f.id));

    setTeamOne(teamOneFighters);
    setTeamTwo(teamTwoFighters);
  };

  const getShareableUrl = () => {
    const teamOneIds = teamOne.map((f) => f.id).join(",");
    const teamTwoIds = teamTwo.map((f) => f.id).join(",");

    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    return `${baseUrl}/fighter-select?team1=${teamOneIds}&team2=${teamTwoIds}`;
  };

  return (
    <GameContext.Provider
      value={{
        fighters,
        setFighters,
        teamOne,
        teamTwo,
        addToTeam,
        removeFromTeam,
        clearTeam,
        loadTeamsFromUrl,
        getShareableUrl,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
