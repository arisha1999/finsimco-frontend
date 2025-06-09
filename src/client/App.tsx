import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../store/team_store";
import Sidebar from "../components/Sidebar";
import Timer from "../components/Timer";
import Accordion from "../components/Accordion";
import InputField from "../components/InputField";
import PieChart from "../components/PieChart";

const App = () => {
  const { teamId } = useParams();
  const setTeam = useStore((s) => s.setTeam);
  const team = useStore((s) => s.team);
  const terms = useStore((s) => s.terms);
  const factorScore = useStore((s) => s.factorScore);
  const tickTimer = useStore((s) => s.tickTimer);

  // Function for timer
  useEffect(() => {
    const interval = setInterval(() => {
      tickTimer();
    }, 1000);
    return () => clearInterval(interval);
  }, [tickTimer]);

  // Set team type
  useEffect(() => {
    setTeam(teamId);
  }, [teamId]);

  // Get all values to count valuation
  const ebitda = terms.find((t) => t.id === "ebitda")?.value || 0;
  const multiple = terms.find((t) => t.id === "multiple")?.value || 0;
  const factor = terms.find((t) => t.id === "factorScore")?.value || factorScore || 1;
  const interestRate = terms.find((t) => t.id === "interestRate")?.value || 0;
  const valuation = ebitda * multiple * factor;

  return (
    <div className="flex min-h-screen bg-finsimco-grey">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6">
        <header className="flex justify-between items-center">
          <h1 className="text-2xl text-finsimco-orange font-bold">Simulation UI — Team: {team.toUpperCase()}</h1>
        </header>

        <Timer />

        <Accordion />

        <section className="grid grid-cols-2 gap-6 min-h-[500px]">
          <div className="space-y-4 h-full flex flex-col justify-between">
            {terms.map((term) => (
              <InputField key={term.id} term={term} />
            ))}
          </div>

          <div className="space-y-4 h-full flex flex-col justify-between">
            <PieChart valuation={valuation} interestRate={interestRate} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;