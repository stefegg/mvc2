"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { useBattleResults } from "@/contexts/BattleResultsContext";
import ResultScreen from "./ResultScreen";
import BattleTransition from "@/components/BattleTransition";
import Link from "next/link";
// this page weird because it wouldn't normally be a client page
// but because we don't have a back end we are fetching results from a context
// in a real app this would be a server component fetching from a database or API

export default function Page() {
  const params = useParams();
  const { getFightResultById } = useBattleResults();
  const [showTransition, setShowTransition] = useState(true);

  const fightId = params.id as string;
  const fightResult = getFightResultById(fightId);

  if (!fightResult) {
    return (
      <div className="min-h-screen p-8 text-white">
        <div className="text-center">
          <h1 className="text-4xl mb-4">Fight Result Not Found</h1>
          <p className="mb-6">The battle result with ID {fightId} could not be found.</p>
          <Link 
            href="/fighter-select" 
            className="inline-block bg-neo-teal hover:bg-neo-purple transition-colors duration-200 text-black font-bold py-3 px-6 rounded-lg"
          >
            Back to Fighter Select
          </Link>
        </div>
      </div>
    );
  }

  const handleTransitionComplete = () => {
    setShowTransition(false);
  };

  return (
    <>
      {showTransition && (
        <BattleTransition onComplete={handleTransitionComplete} />
      )}
      
      {!showTransition && (
        <motion.div 
          className="min-h-screen p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.0, ease: "easeOut" }}
        >
          <ResultScreen fightResult={fightResult} />
        </motion.div>
      )}
    </>
  );
}
