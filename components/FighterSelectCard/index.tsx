import { Fighter } from "@/types";
import Button from "../Button";
import { useGame } from "@/contexts/GameContext";

const FighterSelectCard = ({ fighter }: { fighter: Fighter }) => {
  const { addToTeam, teamOne, teamTwo } = useGame();

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
      {!teamOne.find((f) => f.id === fighter.id) && teamOne.length !== 3 && (
        <Button text="Add to Team One" onClick={() => addToTeam(fighter, 1)} />
      )}
      {!teamTwo.find((f) => f.id === fighter.id) && teamTwo.length !== 3 && (
        <Button text="Add to Team Two" onClick={() => addToTeam(fighter, 2)} />
      )}
    </div>
  );
};

export default FighterSelectCard;
