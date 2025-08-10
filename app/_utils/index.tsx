import { Fighter, FighterStats, FighterType, Team } from "../_types";

const typeAdvantages: Record<
  FighterType,
  { stat: keyof Omit<FighterStats, "type">; target: FighterType }
> = {
  Architect: { stat: "logic", target: "Operator" },
  Operator: { stat: "flow", target: "Wildcard" },
  Wildcard: { stat: "chaos", target: "Architect" },
};

function calculateAdjustedStats(
  fighter: Fighter,
  opposingTeam: Team
): FighterStats {
  const baseStats = fighter.stats;
  const advantage = typeAdvantages[fighter.stats.type];

  const count = opposingTeam.fighters.filter(
    (opponent) => opponent.stats.type === advantage.target
  ).length;

  const statKey = advantage.stat;
  const bonus = baseStats[statKey] * (0.5 * count);

  return {
    ...baseStats,
    [statKey]: baseStats[statKey] + bonus,
  };
}

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

  return {
    teamId: team.id,
    fighters: fightersWithAdjustedStats,
    totalAdvantages,
  };
}

export { getAdjustedTeam, calculateAdjustedStats };
