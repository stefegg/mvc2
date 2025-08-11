import { Fighter } from "@/types";
import Button from "../Button";
import Image from "next/image";

interface FighterSelectCardProps {
  fighter: Fighter;
  onAddToTeam: (fighter: Fighter, teamNumber: 1 | 2) => void;
  isInTeamOne: boolean;
  isInTeamTwo: boolean;
  teamOneComplete: boolean;
  teamTwoComplete: boolean;
}

const FighterSelectCard = ({
  fighter,
  onAddToTeam,
  isInTeamOne,
  isInTeamTwo,
  teamOneComplete,
  teamTwoComplete,
}: FighterSelectCardProps) => {
  const getBgColor = () => {
    switch (fighter.stats.type) {
      case "Wildcard":
        return "bg-[#ff6b6b]";
      case "Operator":
        return "bg-neo-navy";
      case "Architect":
        return "bg-[#8a2be2]";
      default:
        return "bg-gray-500";
    }
  };
  return (
    <div
      key={fighter.id}
      className={`${getBgColor()} p-4 rounded-lg flex flex-col items-center`}
    >
      <Image
        src={`${fighter.portrait}`}
        alt={fighter.name}
        width={500}
        height={500}
        style={{ width: "100%", height: "auto", borderRadius: "8px" }}
      />
      <p className="text-neo-yellow">{fighter.name}</p>
      <p className="text-neo-purple">{fighter.stats.type}</p>
      <div className="text-sm text-neo-blue flex flex-row gap-2">
        <div>Logic: {fighter.stats.logic}</div>
        <div>Flow: {fighter.stats.flow}</div>
        <div>Chaos: {fighter.stats.chaos}</div>
      </div>
      <div className="flex flex-row">
        {!isInTeamOne && !teamOneComplete && (
          <Button
            text="Add to Team One"
            onClick={() => onAddToTeam(fighter, 1)}
          />
        )}
        {!isInTeamTwo && !teamTwoComplete && (
          <Button
            text="Add to Team Two"
            onClick={() => onAddToTeam(fighter, 2)}
          />
        )}
      </div>
    </div>
  );
};

export default FighterSelectCard;
