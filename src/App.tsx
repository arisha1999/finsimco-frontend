// App.tsx
import React, { useEffect } from "react";
import { useStore } from "./store/team_store";
import Sidebar from "./components/Sidebar";
import Timer from "./components/Timer";
import Accordion from "./components/Accordion";
import InputField from "./components/InputField";
import PieChart from "./components/PieChart";

function App() {
  const team = useStore((s) => s.team);
  const setTeam = useStore((s) => s.setTeam);
  const terms = useStore((s) => s.terms);
  const factorScore = useStore((s) => s.factorScore);
  const tickTimer = useStore((s) => s.tickTimer);

  // Запуск таймера каждую секунду
  useEffect(() => {
    const interval = setInterval(() => {
      tickTimer();
    }, 1000);
    return () => clearInterval(interval);
  }, [tickTimer]);

  // Рассчёт valuation
  const ebitda = terms.find((t) => t.id === "ebitda")?.value || 0;
  const multiple = terms.find((t) => t.id === "multiple")?.value || 0;
  const factor = terms.find((t) => t.id === "factorScore")?.value || factorScore || 1;

  const valuation = ebitda * multiple * factor;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6">
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Simulation UI — Team: {team.toUpperCase()}</h1>
          <select
            className="border rounded p-1"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
          >
            <option value="team1">Team 1 (Edit Values)</option>
            <option value="team2">Team 2 (Toggle Status)</option>
          </select>
        </header>

        <Timer />

        <Accordion />

        <section className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            {terms.map((term) => (
              <InputField key={term.id} term={term} />
            ))}
          </div>
          <div className="space-y-4">
            <PieChart valuation={valuation} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;