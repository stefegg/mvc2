import { Fighter } from "@/types";
import Button from "../Button";

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
  teamTwoComplete 
}: FighterSelectCardProps) => {

  return (
    <div key={fighter.id} className="bg-neo-navy p-4 rounded-lg">
      <h3 className="text-neo-yellow">{fighter.name}</h3>
      <p className="text-neo-teal">{fighter.origin}</p>
      <p className="text-neo-purple">{fighter.stats.type}</p>
      <div className="text-sm text-neo-blue mt-2">
        <div>Logic: {fighter.stats.logic}</div>
        <div>Flow: {fighter.stats.flow}</div>
        <div>Chaos: {fighter.stats.chaos}</div>
      </div>
      {!isInTeamOne && !teamOneComplete && (
        <Button text="Add to Team One" onClick={() => onAddToTeam(fighter, 1)} />
      )}
      {!isInTeamTwo && !teamTwoComplete && (
        <Button text="Add to Team Two" onClick={() => onAddToTeam(fighter, 2)} />
      )}
    </div>
  );
};

export default FighterSelectCard;
