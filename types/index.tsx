// Base fighter identification info
type FighterInfo = {
  id: string;
  name: string;
  portrait: string;
};

type Fighter = FighterInfo & {
  origin: string;
  stats: FighterStats;
};

type FighterType = "Architect" | "Operator" | "Wildcard";

type FighterStats = {
  type: FighterType;
  logic: number;
  flow: number;
  chaos: number;
};

// Architect beats operator, operator beats wildcard, wildcard beats architect
type Team = {
  id: string;
  fighters: Fighter[];
};

type AdjustedFighter = FighterInfo & {
  adjustedStats: FighterStats;
  adjustedPower: number;
  advantageCount: number;
};

type AdjustedTeam = {
  teamId: string;
  fighters: AdjustedFighter[];
  totalAdvantages: number;
  totalPower: number;
  totalLogic: number;
  totalFlow: number;
  totalChaos: number;
};

type TeamFightSummary = {
  team: AdjustedTeam;
  winPercentage: number;
};

type FightResult = {
  id: string;
  winningTeam: TeamFightSummary;
  losingTeam: TeamFightSummary;
  winningSkill: number;
  losingSkill: number;
  winningFinalPower: number;
  losingFinalPower: number;
  winner: "Team 1" | "Team 2";
  mvp: FighterInfo & {
    adjustedPower: number;
    advantageCount: number;
  };
};

export type {
  FighterInfo,
  Fighter,
  FighterType,
  FighterStats,
  Team,
  FightResult,
  TeamFightSummary,
};
