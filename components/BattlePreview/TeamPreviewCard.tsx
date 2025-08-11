import { TeamFightSummary } from "@/types";
import AnimatedBorderButton from "../AnimatedBorderButton";
import Image from "next/image";
import { COLORS } from "@/constants/theme";

interface TeamPreviewCardProps {
  teamSummary: TeamFightSummary;
  teamNumber: 1 | 2;
  onGoBack: (teamNumber: 1 | 2) => void;
}

const TeamPreviewCard = ({
  teamSummary,
  teamNumber,
  onGoBack,
}: TeamPreviewCardProps) => {
  return (
    <div className="bg-neo-navy p-4 rounded-lg">
      <h3 className="text-neo-blue text-xl mb-2">Team {teamNumber} Summary</h3>
      <p>Total Adjusted Stats: {teamSummary.team.totalPower}</p>
      <p className="text-sm">
        Logic: {teamSummary.team.totalLogic} | Flow: {teamSummary.team.totalFlow} | Chaos:{" "}
        {teamSummary.team.totalChaos}
      </p>
      <p>Total Advantages: {teamSummary.team.totalAdvantages}</p>
      <p className="text-neo-yellow text-lg font-bold">
        Win Chance: {teamSummary.winPercentage}%
      </p>
      <div className="text-neo-teal space-y-1 flex flex-row justify-center gap-4">
        {teamSummary.team.fighters.map((fighter) => (
          <div
            key={fighter.id}
            className="mb-2 flex flex-col items-center text-md"
          >
            <Image
              src={fighter.portrait}
              alt={fighter.name}
              width={75}
              height={75}
              className="rounded-md"
            />
            <h4 className="text-neo-purple">{fighter.name}</h4>
            <p>Adjusted Logic: {fighter.adjustedStats.logic}</p>
            <p>Adjusted Flow: {fighter.adjustedStats.flow}</p>
            <p>Adjusted Chaos: {fighter.adjustedStats.chaos}</p>
            <p>Advantages Over Opponent: {fighter.advantageCount}</p>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <AnimatedBorderButton
          text="Go Back"
          onClick={() => onGoBack(teamNumber)}
          initialColor={COLORS.NEO_RED}
          hoverColor={COLORS.NEO_YELLOW}
          contentClassName="bg-neo-navy text-neo-blue"
        />
      </div>
    </div>
  );
};

export default TeamPreviewCard;
