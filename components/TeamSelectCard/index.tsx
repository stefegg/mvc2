import Image from "next/image";
import AnimatedBorderButton from "../AnimatedBorderButton";
import FighterStats from "../FighterStats";
import { Fighter } from "@/types";
import { useFlashAnimation } from "../../hooks/useFlashAnimation";
import { BUTTON_STYLES, COMMON_CLASSES, COLORS } from "../../constants/theme";

type TeamSelectCardProps = {
  team: Fighter[];
  teamReady: boolean;
  handleTeamReady: (teamNo: 1 | 2) => void;
  clearTeam: (teamNo: 1 | 2) => void;
  generateRandomTeam: (teamNo: 1 | 2) => void;
  removeFromTeam: (fighterId: string, teamNo: 1 | 2) => void;
  teamNo: 1 | 2;
  bgColor?: string;
};

const TeamSelectCard = ({
  team,
  teamReady,
  handleTeamReady,
  clearTeam,
  generateRandomTeam,
  removeFromTeam,
  teamNo,
  bgColor = "bg-neo-plum",
}: TeamSelectCardProps) => {
  const { triggerFlash, flashRef } = useFlashAnimation();

  return (
    <div
      className={`${bgColor} w-[30%] rounded-md flex flex-col px-4 py-2 gap-4 relative`}
    >
      <div 
        ref={flashRef}
        className="absolute inset-0 bg-white opacity-0 pointer-events-none rounded-r-md z-10" 
      />
      <h2 className="text-2xl">Team {teamNo}</h2>
      {team.map((fighter) => (
        <div key={fighter.id} className="text-lg">
          <div className="grid grid-cols-2 gap">
            <Image
              src={`${fighter.portrait}`}
              alt={fighter.name}
              width={100}
              height={100}
              style={{
                borderRadius: "8px",
              }}
            />
            <div className={COMMON_CLASSES.TEXT_STATS}>
              <h3 className={COMMON_CLASSES.TEXT_NAME}>{fighter.name}</h3>
              <p className={COMMON_CLASSES.TEXT_ORIGIN}>{fighter.stats.type}</p>
              <FighterStats stats={fighter.stats} layout="vertical" />
            </div>
          </div>
          <div
            className="flex justify-start text-white hover:text-neo-red cursor-pointer"
            onClick={() => removeFromTeam(fighter.id, teamNo)}
          >
            Remove
          </div>
        </div>
      ))}
      <div className="col-start-4 col-end-6 row-start-2 row-end-3 flex flex-row justify-evenly gap-2">
        <AnimatedBorderButton
          text={teamReady ? "Back" : "Ready"}
          onClick={() => {
            triggerFlash();
            handleTeamReady(teamNo);
          }}
          disabled={team.length !== 3}
          initialColor={team.length === 3 ? BUTTON_STYLES.READY.initialColor : COLORS.GRAY_DISABLED}
          hoverColor={team.length === 3 ? BUTTON_STYLES.READY.hoverColor : COLORS.GRAY_DISABLED}
          contentClassName={team.length === 3 ? COMMON_CLASSES.BUTTON_PRIMARY_ACTIVE : COMMON_CLASSES.BUTTON_PRIMARY_DISABLED}
        />
        <AnimatedBorderButton
          text="Reset"
          onClick={() => clearTeam(teamNo)}
          disabled={team.length === 0 || teamReady}
          initialColor={!teamReady && team.length > 0 ? BUTTON_STYLES.RESET.initialColor : COLORS.GRAY_DISABLED}
          hoverColor={!teamReady && team.length > 0 ? BUTTON_STYLES.RESET.hoverColor : COLORS.GRAY_DISABLED}
          contentClassName={!teamReady && team.length > 0 ? COMMON_CLASSES.BUTTON_PRIMARY_ACTIVE : COMMON_CLASSES.BUTTON_PRIMARY_DISABLED}
        />
        <AnimatedBorderButton
          text="Random"
          onClick={() => {
            triggerFlash();
            generateRandomTeam(teamNo);
          }}
          initialColor={BUTTON_STYLES.RANDOM.initialColor}
          hoverColor={BUTTON_STYLES.RANDOM.hoverColor}
          contentClassName={COMMON_CLASSES.BUTTON_PRIMARY_ACTIVE}
        />
      </div>
    </div>
  );
};

export default TeamSelectCard;
