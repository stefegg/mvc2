import { fetchFighters } from "../../lib/api";
import FighterSelect from "./FighterSelect";

export default async function Page() {
  const fighters = await fetchFighters();

  return (
    <div className="min-h-screen p-8">
      <FighterSelect initialFighters={fighters} />
    </div>
  );
}
