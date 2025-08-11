import { TeamFightSummary } from "@/types";
import AnimatedBorderButton from "../AnimatedBorderButton";

interface TeamPreviewCardProps {
  teamSummary: TeamFightSummary;
  teamNumber: 1 | 2;
  onGoBack: (teamNumber: 1 | 2) => void;
}

const TeamPreviewCard = ({ teamSummary, teamNumber, onGoBack }: TeamPreviewCardProps) => {
  return (
    <div className="bg-neo-navy p-4 rounded-lg">
      <h3 className="text-neo-blue text-xl mb-2">Team {teamNumber} Summary</h3>
      <div className="text-neo-teal space-y-1">
        {teamSummary.team.fighters.map((fighter) => (
          <div key={fighter.fighterId} className="mb-2">
            <h4 className="text-neo-purple">{fighter.fighterName}</h4>
            <p>Adjusted Logic: {fighter.adjustedStats.logic}</p>
            <p>Adjusted Flow: {fighter.adjustedStats.flow}</p>
            <p>Adjusted Chaos: {fighter.adjustedStats.chaos}</p>
            <p>Advantages Over Opponent: {fighter.advantageCount}</p>
          </div>
        ))}
        <p>Total Adjusted Stats: {teamSummary.totalPower}</p>
        <p className="text-sm">
          Logic: {teamSummary.totalLogic} | Flow: {teamSummary.totalFlow} |
          Chaos: {teamSummary.totalChaos}
        </p>
        <p>Total Advantages: {teamSummary.totalAdvantages}</p>
        <p className="text-neo-yellow text-lg font-bold">
          Win Chance: {teamSummary.winPercentage}%
        </p>
        <div className="mt-4">
          <AnimatedBorderButton
            text="Go Back"
            onClick={() => onGoBack(teamNumber)}
            initialColor="#FF6B6B"
            hoverColor="#FFF700"
            contentClassName="bg-neo-navy text-neo-blue"
          />
        </div>
      </div>
    </div>
  );
};

export default TeamPreviewCard;
