import AnimatedBorderDiv from "../AnimatedBorderDiv";
import Button from "../Button";
import TeamPreviewCard from "./TeamPreviewCard";
import { useMemo } from "react";
import { useGame } from "@/contexts/GameContext";
import { Team } from "@/types";
import { createBattlePreview } from "../../utils";

interface BattlePreviewProps {
  onTeamReadyToggle: (teamNumber: 1 | 2) => void;
}

const BattlePreview = ({ onTeamReadyToggle }: BattlePreviewProps) => {
  const { teamOne, teamTwo } = useGame();

  const battlePreview = useMemo(() => {
    if (teamOne.length === 3 && teamTwo.length === 3) {
      const teamOneObj: Team = {
        id: `team-one-${Date.now()}`,
        fighters: teamOne,
      };

      const teamTwoObj: Team = {
        id: `team-two-${Date.now()}`,
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
      <AnimatedBorderDiv
        initialColor="#03DAc6"
        hoverColor="#BB86FC"
        contentClassName="bg-neo-navy text-neo-teal"
      >
        <Button text="F I G H T!" onClick={handleCopyUrl} />
      </AnimatedBorderDiv>
      <AnimatedBorderDiv
        initialColor="#03DAc6"
        hoverColor="#BB86FC"
        contentClassName="bg-neo-navy text-neo-teal"
      >
        <Button text="Copy Battle URL" onClick={handleCopyUrl} />
      </AnimatedBorderDiv>
    </div>
  );
};

export default BattlePreview;
