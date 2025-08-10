type Fighter = {
  id: string;
  name: string;
  portrait: string;
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

type TeamFightSummary = {
  team: Team;
  totalLogic: number;
  totalFlow: number;
  totalChaos: number;
  totalAdvantages: number;
};

type FightResult = {
  teamOneSummary: TeamFightSummary;
  teamTwoSummary: TeamFightSummary;
  winner: "teamOne" | "teamTwo" | "draw";
  mvp: Fighter;
};

export type { Fighter, FighterType, FighterStats, Team, FightResult };
