import { Suspense } from "react";
import { fetchFighters } from "../../lib/api";
import FighterSelect from "./FighterSelect";

export default async function Page() {
  const fighters = await fetchFighters();

  return (
    <div className="min-h-screen p-8">
      <Suspense fallback={<div className="text-white text-center">Loading fighters...</div>}>
        <FighterSelect initialFighters={fighters} />
      </Suspense>
    </div>
  );
}
