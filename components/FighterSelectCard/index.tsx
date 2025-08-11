import { Fighter } from "@/types";
import Button from "../Button";
import FighterStats from "../FighterStats";
import Image from "next/image";
import { COMMON_CLASSES } from "../../constants/theme";

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
      className={`${getBgColor()} p-4 rounded-lg flex flex-col items-center relative group`}
    >
      <Image
        src={`${fighter.portrait}`}
        alt={fighter.name}
        width={500}
        height={500}
        style={{ width: "100%", height: "auto", borderRadius: "8px" }}
      />
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-0 bg-black/80 flex flex-col w-full">
        <div className="flex flex-row gap-4 justify-center">
          <p className={COMMON_CLASSES.TEXT_NAME}>{fighter.name}</p>
          <p className={COMMON_CLASSES.TEXT_TYPE}>{fighter.stats.type}</p>
        </div>
        <div className="flex flex-row justify-center">
          <p className={COMMON_CLASSES.TEXT_ORIGIN}>{fighter.origin}</p>
        </div>
        <div className="justify-center pb-2">
          <FighterStats stats={fighter.stats} className="text-sm text-neo-blue flex flex-row gap-2 justify-center" />
        </div>
        <div className="flex flex-row justify-evenly">
          {!isInTeamOne && !teamOneComplete && (
            <Button
              text="+ Team One"
              onClick={() => onAddToTeam(fighter, 1)}
              className="hover:text-neo-yellow p-0 border border-neo-white hover:border-neo-yellow rounded-md text-sm"
            />
          )}
          {!isInTeamTwo && !teamTwoComplete && (
            <Button
              text="+ Team Two"
              onClick={() => onAddToTeam(fighter, 2)}
              className="hover:text-neo-yellow p-0 border border-neo-white hover:border-neo-yellow rounded-md text-sm"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FighterSelectCard;
