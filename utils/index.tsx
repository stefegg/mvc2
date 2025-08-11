import { FighterStats, FighterType, Team, TeamFightSummary, FightResult } from "../types";

const typeAdvantages: Record<
  FighterType,
  { stat: keyof Omit<FighterStats, "type">; target: FighterType }
> = {
  Architect: { stat: "logic", target: "Operator" },
  Operator: { stat: "flow", target: "Wildcard" },
  Wildcard: { stat: "chaos", target: "Architect" },
};

function getAdjustedTeam(team: Team, opponent: Team) {
  let totalAdvantages = 0;
  let totalLogic = 0;
  let totalFlow = 0;
  let totalChaos = 0;

  const fightersWithAdjustedStats = team.fighters.map((fighter) => {
    const advantage = typeAdvantages[fighter.stats.type];
    const count = opponent.fighters.filter(
      (o) => o.stats.type === advantage.target
    ).length;

    totalAdvantages += count;

    const statKey = advantage.stat;
    const bonus = fighter.stats[statKey] * (0.5 * count);

    const adjustedStats = {
      ...fighter.stats,
      [statKey]: fighter.stats[statKey] + bonus,
    };

    // Calculate individual power and accumulate totals in single pass
    const individualPower = adjustedStats.logic + adjustedStats.flow + adjustedStats.chaos;
    totalLogic += adjustedStats.logic;
    totalFlow += adjustedStats.flow;
    totalChaos += adjustedStats.chaos;

    return {
      fighterId: fighter.id,
      fighterName: fighter.name,
      portrait: fighter.portrait,
      adjustedStats,
      adjustedPower: individualPower, // Pre-calculate for MVP
      advantageCount: count,
    };
  });

  return {
    teamId: team.id,
    fighters: fightersWithAdjustedStats,
    totalAdvantages,
    totalPower: totalLogic + totalFlow + totalChaos,
    totalLogic,
    totalFlow,
    totalChaos,
  };
}

function createBattlePreview(teamOne: Team, teamTwo: Team): TeamFightSummary[] {
  // Get adjusted teams with pre-calculated totals
  const adjustedTeamOne = getAdjustedTeam(teamOne, teamTwo);
  const adjustedTeamTwo = getAdjustedTeam(teamTwo, teamOne);

  // Calculate win percentages
  const team1Power = adjustedTeamOne.totalPower;
  const team2Power = adjustedTeamTwo.totalPower;

  let team1WinPercentage: number;
  let team2WinPercentage: number;

  if (team1Power === team2Power) {
    team1WinPercentage = 50;
    team2WinPercentage = 50;
  } else {
    const totalPower = team1Power + team2Power;
    team1WinPercentage = Math.round((team1Power / totalPower) * 100);
    team2WinPercentage = 100 - team1WinPercentage;
  }

  // Use pre-calculated totals instead of re-calculating
  const teamOneSummary: TeamFightSummary = {
    team: adjustedTeamOne,
    totalLogic: adjustedTeamOne.totalLogic,
    totalFlow: adjustedTeamOne.totalFlow,
    totalChaos: adjustedTeamOne.totalChaos,
    totalPower: adjustedTeamOne.totalPower,
    totalAdvantages: adjustedTeamOne.totalAdvantages,
    winPercentage: team1WinPercentage,
  };

  const teamTwoSummary: TeamFightSummary = {
    team: adjustedTeamTwo,
    totalLogic: adjustedTeamTwo.totalLogic,
    totalFlow: adjustedTeamTwo.totalFlow,
    totalChaos: adjustedTeamTwo.totalChaos,
    totalPower: adjustedTeamTwo.totalPower,
    totalAdvantages: adjustedTeamTwo.totalAdvantages,
    winPercentage: team2WinPercentage,
  };

  return [teamOneSummary, teamTwoSummary];
}

function calculateBattleResult(teamOneSummary: TeamFightSummary, teamTwoSummary: TeamFightSummary): Omit<FightResult, "id"> {
  // Generate random skill numbers between 1-500
  const teamOneSkill = Math.floor(Math.random() * 500) + 1;
  const teamTwoSkill = Math.floor(Math.random() * 500) + 1;
  
  // Calculate final power (totalPower + skill)
  const teamOneFinalPower = teamOneSummary.totalPower + teamOneSkill;
  const teamTwoFinalPower = teamTwoSummary.totalPower + teamTwoSkill;
  
  // Determine winner
  let winner: "teamOne" | "teamTwo" | "draw";
  if (teamOneFinalPower > teamTwoFinalPower) {
    winner = "teamOne";
  } else if (teamTwoFinalPower > teamOneFinalPower) {
    winner = "teamTwo";
  } else {
    winner = "draw";
  }
  
  // Calculate MVP using pre-calculated adjustedPower
  const allFighters = [
    ...teamOneSummary.team.fighters.map(f => ({
      ...f,
      team: "teamOne" as const,
    })),
    ...teamTwoSummary.team.fighters.map(f => ({
      ...f,
      team: "teamTwo" as const,
    }))
  ];
  
  const mvpFighter = allFighters.reduce((prev, current) => 
    current.adjustedPower > prev.adjustedPower ? current : prev
  );
  
  const mvp = {
    fighterId: mvpFighter.fighterId,
    fighterName: mvpFighter.fighterName,
    portrait: mvpFighter.portrait,
    adjustedPower: mvpFighter.adjustedPower,
    advantageCount: mvpFighter.advantageCount,
    team: mvpFighter.team,
  };
  
  return {
    teamOneSummary,
    teamTwoSummary,
    teamOneSkill,
    teamTwoSkill,
    teamOneFinalPower,
    teamTwoFinalPower,
    winner,
    mvp,
  };
}

export { getAdjustedTeam, createBattlePreview, calculateBattleResult };
