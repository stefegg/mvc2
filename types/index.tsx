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

type AdjustedTeam = {
  teamId: string;
  fighters: {
    fighterId: string;
    fighterName: string;
    portrait: string;
    adjustedStats: FighterStats;
    adjustedPower: number;
    advantageCount: number;
  }[];
  totalAdvantages: number;
  totalPower: number;
  totalLogic: number;
  totalFlow: number;
  totalChaos: number;
};

type TeamFightSummary = {
  team: AdjustedTeam;
  totalLogic: number;
  totalFlow: number;
  totalChaos: number;
  totalPower: number;
  totalAdvantages: number;
  winPercentage: number;
};

type FightResult = {
  id: string;
  teamOneSummary: TeamFightSummary;
  teamTwoSummary: TeamFightSummary;
  teamOneSkill: number;
  teamTwoSkill: number;
  teamOneFinalPower: number;
  teamTwoFinalPower: number;
  winner: "teamOne" | "teamTwo" | "draw";
  mvp: {
    fighterId: string;
    fighterName: string;
    portrait: string;
    adjustedPower: number;
    advantageCount: number;
    team: "teamOne" | "teamTwo";
  };
};

export type {
  Fighter,
  FighterType,
  FighterStats,
  Team,
  FightResult,
  TeamFightSummary,
};
