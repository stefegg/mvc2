"use client";

import { createContext, useContext, useState, ReactNode, useCallback, useMemo } from "react";
import { FightResult } from "../types";
import { v4 as uuidv4 } from "uuid";
// in a real application, this would be replaced with an API call to fetch results
interface BattleResultsContextType {
  fightResults: Record<string, FightResult>;
  saveFightResult: (result: Omit<FightResult, "id">) => string;
  getFightResultById: (id: string) => FightResult | null;
}

const BattleResultsContext = createContext<
  BattleResultsContextType | undefined
>(undefined);

export function BattleResultsProvider({ children }: { children: ReactNode }) {
  // In a real-world scenario, this would be saved to a database instead
  const [fightResults, setFightResults] = useState<Record<string, FightResult>>(
    {}
  );

  const saveFightResult = useCallback((result: Omit<FightResult, "id">): string => {
    const id = uuidv4();
    const fightResult: FightResult = {
      ...result,
      id,
    };

    // Mock database save - in real world, this would be an API call
    setFightResults((prev) => ({
      ...prev,
      [id]: fightResult,
    }));

    return id;
  }, []);

  const getFightResultById = useCallback((id: string): FightResult | null => {
    // Mock database fetch - in real world, this would be an API call
    return fightResults[id] || null;
  }, [fightResults]);

  const contextValue = useMemo(() => ({
    fightResults,
    saveFightResult,
    getFightResultById,
  }), [fightResults, saveFightResult, getFightResultById]);

  return (
    <BattleResultsContext.Provider value={contextValue}>
      {children}
    </BattleResultsContext.Provider>
  );
}

export function useBattleResults() {
  const context = useContext(BattleResultsContext);
  if (context === undefined) {
    throw new Error(
      "useBattleResults must be used within a BattleResultsProvider"
    );
  }
  return context;
}
