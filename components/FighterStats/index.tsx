import { FighterStats as Stats } from "@/types";

interface FighterStatsProps {
  stats: Stats;
  className?: string;
  showType?: boolean;
  layout?: "horizontal" | "vertical";
  prefix?: string;
}

const FighterStats = ({
  stats,
  className = "text-sm text-neo-blue",
  showType = false,
  layout = "horizontal",
  prefix = "",
}: FighterStatsProps) => {
  const baseClass =
    layout === "horizontal" ? "flex flex-row gap-2" : "flex flex-col";

  return (
    <div className={`${baseClass} ${className}`}>
      {showType && <div>Type: {stats.type}</div>}
      <div>
        {prefix}Logic: {stats.logic}
      </div>
      <div>
        {prefix}Flow: {stats.flow}
      </div>
      <div>
        {prefix}Chaos: {stats.chaos}
      </div>
    </div>
  );
};

export default FighterStats;
