import { FighterStats, FighterType, Team, TeamFightSummary } from "../types";

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

  const fightersWithAdjustedStats = team.fighters.map((fighter) => {
    const advantage = typeAdvantages[fighter.stats.type];
    const count = opponent.fighters.filter(
      (o) => o.stats.type === advantage.target
    ).length;

    totalAdvantages += count;

    const statKey = advantage.stat;
    const bonus = fighter.stats[statKey] * (0.5 * count);

    return {
      fighterId: fighter.id,
      fighterName: fighter.name,
      adjustedStats: {
        ...fighter.stats,
        [statKey]: fighter.stats[statKey] + bonus,
      },
      advantageCount: count,
    };
  });

  // Calculate total power (sum of all adjusted stats)
  const totalPower = fightersWithAdjustedStats.reduce((sum, fighter) => {
    return (
      sum +
      fighter.adjustedStats.logic +
      fighter.adjustedStats.flow +
      fighter.adjustedStats.chaos
    );
  }, 0);

  return {
    teamId: team.id,
    fighters: fightersWithAdjustedStats,
    totalAdvantages,
    totalPower,
  };
}

function createBattlePreview(teamOne: Team, teamTwo: Team): TeamFightSummary[] {
  // Get adjusted teams
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

  // Calculate individual stat totals
  const team1Logic = adjustedTeamOne.fighters.reduce(
    (sum, f) => sum + f.adjustedStats.logic,
    0
  );
  const team1Flow = adjustedTeamOne.fighters.reduce(
    (sum, f) => sum + f.adjustedStats.flow,
    0
  );
  const team1Chaos = adjustedTeamOne.fighters.reduce(
    (sum, f) => sum + f.adjustedStats.chaos,
    0
  );

  const team2Logic = adjustedTeamTwo.fighters.reduce(
    (sum, f) => sum + f.adjustedStats.logic,
    0
  );
  const team2Flow = adjustedTeamTwo.fighters.reduce(
    (sum, f) => sum + f.adjustedStats.flow,
    0
  );
  const team2Chaos = adjustedTeamTwo.fighters.reduce(
    (sum, f) => sum + f.adjustedStats.chaos,
    0
  );

  const teamOneSummary: TeamFightSummary = {
    team: adjustedTeamOne,
    totalLogic: team1Logic,
    totalFlow: team1Flow,
    totalChaos: team1Chaos,
    totalPower: team1Power,
    totalAdvantages: adjustedTeamOne.totalAdvantages,
    winPercentage: team1WinPercentage,
  };

  const teamTwoSummary: TeamFightSummary = {
    team: adjustedTeamTwo,
    totalLogic: team2Logic,
    totalFlow: team2Flow,
    totalChaos: team2Chaos,
    totalPower: team2Power,
    totalAdvantages: adjustedTeamTwo.totalAdvantages,
    winPercentage: team2WinPercentage,
  };

  return [teamOneSummary, teamTwoSummary];
}

export { getAdjustedTeam, createBattlePreview };
