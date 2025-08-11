import AnimatedBorderButton from "../AnimatedBorderButton";
import TeamPreviewCard from "./TeamPreviewCard";
import { useMemo } from "react";
import { useGame } from "@/contexts/GameContext";
import { useBattleResults } from "@/contexts/BattleResultsContext";
import { Team } from "@/types";
import { createBattlePreview, calculateBattleResult } from "../../utils";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { COLORS } from "@/constants/theme";

interface BattlePreviewProps {
  onTeamReadyToggle: (teamNumber: 1 | 2) => void;
}

const BattlePreview = ({ onTeamReadyToggle }: BattlePreviewProps) => {
  const { teamOne, teamTwo } = useGame();
  const { saveFightResult } = useBattleResults();
  const router = useRouter();

  const battlePreview = useMemo(() => {
    if (teamOne.length === 3 && teamTwo.length === 3) {
      const teamOneObj: Team = {
        id: uuidv4(),
        fighters: teamOne,
      };

      const teamTwoObj: Team = {
        id: uuidv4(),
        fighters: teamTwo,
      };

      return createBattlePreview(teamOneObj, teamTwoObj);
    }
    return null;
  }, [teamOne, teamTwo]);

  const getShareableUrl = () => {
    const teamOneIds = teamOne.map((f) => f.id).join(",");
    const teamTwoIds = teamTwo.map((f) => f.id).join(",");

    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    return `${baseUrl}/fighter-select?team1=${teamOneIds}&team2=${teamTwoIds}`;
  };

  const handleCopyUrl = () => {
    const url = getShareableUrl();
    navigator.clipboard.writeText(url);
    alert("URL copied to clipboard!");
  };

  const handleSeeResult = () => {
    if (!battlePreview || battlePreview.length !== 2) return;
    
    // Calculate the battle result
    const result = calculateBattleResult(battlePreview[0], battlePreview[1]);
    
    // Save the result and get the ID
    const resultId = saveFightResult(result);
    
    // Navigate to the result screen
    router.push(`/result-screen/${resultId}`);
  };

  if (!battlePreview) {
    return <div>Loading battle preview...</div>;
  }

  return (
    <div className="text-center my-4">
      <h2 className="text-2xl text-neo-yellow mb-4">
        Battle Ready! Fight Preview:
      </h2>
      <div className="grid grid-cols-2 gap-8 mb-4">
        {battlePreview.map((teamSummary, index) => (
          <TeamPreviewCard
            key={index}
            teamSummary={teamSummary}
            teamNumber={(index + 1) as 1 | 2}
            onGoBack={onTeamReadyToggle}
          />
        ))}
      </div>
      <div className="flex flex-row gap-4 w-full justify-center">
        <AnimatedBorderButton
          text="SEE RESULT!"
          onClick={handleSeeResult}
          initialColor={COLORS.NEO_TEAL}
          hoverColor={COLORS.NEO_PURPLE}
          contentClassName="bg-neo-navy text-neo-teal"
        />
        <AnimatedBorderButton
          text="Copy Battle URL"
          onClick={handleCopyUrl}
          initialColor={COLORS.NEO_TEAL}
          hoverColor={COLORS.NEO_PURPLE}
          contentClassName="bg-neo-navy text-neo-teal"
        />
      </div>
    </div>
  );
};

export default BattlePreview;
