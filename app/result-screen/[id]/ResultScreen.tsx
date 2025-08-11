import { FightResult } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import { COLORS } from "@/constants/theme";

function ResultScreen({ fightResult }: { fightResult: FightResult }) {
  return (
    <div className="text-white flex flex-col w-full items-center min-h-screen p-8">
      <motion.h1
        className="text-7xl italic text-center mb-8 font-bold"
        initial={{ color: COLORS.NEO_RED }}
        animate={{
          color: [
            COLORS.NEO_RED,
            COLORS.NEO_YELLOW,
            "#ffffff",
            COLORS.NEO_YELLOW,
            COLORS.NEO_RED,
          ],
        }}
        transition={{
          duration: 1.0,
          times: [0, 0.25, 0.5, 0.75, 1],
          ease: "easeInOut",
        }}
      >
        Battle Result
      </motion.h1>
      <div className="grid grid-cols-2 w-full gap-4 flex-1 h-full">
        <div className="bg-neo-navy p-4 rounded-lg col-span-1 flex flex-col border-2 border-neo-purple items-center justify-between py-8">
          <h2 className="text-5xl text-neo-purple">
            Winner: {fightResult.winner}
          </h2>
          <h3 className="text-4xl text-neo-teal">
            Team Power: {fightResult.winningFinalPower}
          </h3>
          <div className="flex flex-row gap-8">
            {fightResult.winningTeam.team.fighters.map((fighter, idx) => (
              <div
                className="flex flex-col items-center text-2xl text-neo-purple gap"
                key={`${fighter.id} + ${idx}`}
              >
                <Image
                  src={fighter.portrait}
                  alt={fighter.name}
                  width={100}
                  height={100}
                  className="rounded-md"
                />
                <p>{fighter.name}</p>
                <p>Total Power: {fighter.adjustedPower}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 w-full text-neo-teal">
            <h3 className="col-span-1 flex justify-center text-4xl">
              Winner Player Skill: {fightResult.winningSkill}
            </h3>
            <h3 className="col-span-1 flex justify-center text-4xl">
              Loser Player Skill: {fightResult.losingSkill}
            </h3>
          </div>

          <h3 className="text-4xl text-neo-yellow">
            Total Advantages: {fightResult.winningTeam.team.totalAdvantages}
          </h3>
          <h3 className="text-4xl text-neo-red">
            Pre-fight Win Chance: {fightResult.winningTeam.winPercentage}%
          </h3>
        </div>
        <div className="bg-neo-red border-2 border-neo-yellow col-span-1 rounded-md flex flex-col items-center p-4 gap-8">
          <h2 className="text-5xl text-neo-yellow">MVP</h2>
          <Image
            src={fightResult.mvp.portrait}
            alt={fightResult.mvp.name}
            width={400}
            height={400}
            className="rounded-full mb-4 border border-2 border-neo-yellow"
          />
          <h3 className="text-4xl text-neo-blue">{fightResult.mvp.name}</h3>
          <div className="grid grid-cols-2 w-full px-8 text-neo-yellow">
            <p className="col-span-1 flex justify-start text-4xl">
              Total Power: {fightResult.mvp.adjustedPower}
            </p>
            <p className="col-span-1 flex justify-end text-4xl">
              Total Advantages: {fightResult.mvp.advantageCount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultScreen;
