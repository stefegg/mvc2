import { Fighter } from "../types";
import { mockFighters } from "../data/fighters";


export const fetchFighters = async (): Promise<Fighter[]> => {
  return mockFighters;
};

export const fetchFighterById = async (id: string): Promise<Fighter | null> => {
  const fighter = mockFighters.find(f => f.id === id);
  return fighter || null;
};