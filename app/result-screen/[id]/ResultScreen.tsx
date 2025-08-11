import { FightResult } from "@/types";

function ResultScreen({ fightResult }: { fightResult: FightResult }) {
  return (
    <div className="text-white">
      <h1 className="text-4xl mb-4">Battle Result</h1>
      <div className="bg-neo-navy p-4 rounded-lg">
        <p>Fight ID: {fightResult.id}</p>
        <p>Winner: {fightResult.winner}</p>
        <p>
          MVP: {fightResult.mvp.fighterName} ({fightResult.mvp.adjustedPower}{" "}
          power)
        </p>
      </div>
    </div>
  );
}

export default ResultScreen;
