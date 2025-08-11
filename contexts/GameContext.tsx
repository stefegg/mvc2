"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
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
  setTeam: (fighters: Fighter[], teamNumber: 1 | 2) => void;

  // Team sharing via URL
  loadTeamsFromUrl: (teamOneIds: string[], teamTwoIds: string[]) => void;
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

  const getTeamOperations = useCallback(
    (teamNumber: 1 | 2) => ({
      currentTeam: teamNumber === 1 ? teamOne : teamTwo,
      setTeam: teamNumber === 1 ? setTeamOne : setTeamTwo,
    }),
    [teamOne, teamTwo]
  );

  const addToTeam = useCallback(
    (fighter: Fighter, teamNumber: 1 | 2) => {
      const { currentTeam, setTeam } = getTeamOperations(teamNumber);

      if (
        currentTeam.length < 3 &&
        !currentTeam.find((f) => f.id === fighter.id)
      ) {
        setTeam([...currentTeam, fighter]);
      }
    },
    [getTeamOperations]
  );

  const removeFromTeam = useCallback(
    (fighterId: string, teamNumber: 1 | 2) => {
      const { currentTeam, setTeam } = getTeamOperations(teamNumber);

      setTeam(currentTeam.filter((f) => f.id !== fighterId));
    },
    [getTeamOperations]
  );

  const clearTeam = useCallback(
    (teamNumber: 1 | 2) => {
      const { setTeam } = getTeamOperations(teamNumber);
      setTeam([]);
    },
    [getTeamOperations]
  );

  const setTeam = useCallback(
    (fighters: Fighter[], teamNumber: 1 | 2) => {
      const { setTeam: setTeamState } = getTeamOperations(teamNumber);
      setTeamState(fighters);
    },
    [getTeamOperations]
  );

  const loadTeamsFromUrl = useCallback(
    (teamOneIds: string[], teamTwoIds: string[]) => {
      const teamOneFighters = fighters.filter((f) => teamOneIds.includes(f.id));
      const teamTwoFighters = fighters.filter((f) => teamTwoIds.includes(f.id));

      setTeamOne(teamOneFighters);
      setTeamTwo(teamTwoFighters);
    },
    [fighters]
  );

  const contextValue = useMemo(
    () => ({
      fighters,
      setFighters,
      teamOne,
      teamTwo,
      addToTeam,
      removeFromTeam,
      clearTeam,
      setTeam,
      loadTeamsFromUrl,
    }),
    [
      fighters,
      teamOne,
      teamTwo,
      addToTeam,
      removeFromTeam,
      clearTeam,
      setTeam,
      loadTeamsFromUrl,
    ]
  );

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};
