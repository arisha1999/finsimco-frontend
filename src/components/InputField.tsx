// components/InputField.tsx
import React from "react";
import { Term, useStore } from "../store/team_store";

interface Props {
  term: Term;
}

export default function InputField({ term }: Props) {
  const team = useStore((s) => s.team);
  const setTermValue = useStore((s) => s.setTermValue);
  const toggleTermStatus = useStore((s) => s.toggleTermStatus);

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const num = val === "" ? null : Number(val);
    if (!isNaN(num)) {
      setTermValue(term.id, num);
    }
  };

  const onToggleClick = () => {
    if (team === "team2") {
      toggleTermStatus(term.id);
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 bg-white rounded-lg p-4 shadow-md">
      <label className="w-32 text-gray-700 font-medium">{term.label}</label>
      <input
        type="number"
        value={term.value ?? ""}
        onChange={onValueChange}
        disabled={team !== "team1"}
        className={`
          border rounded-md px-3 py-2 w-28 text-sm shadow-sm transition-all duration-200
          ${team === "team1"
            ? "bg-white focus:outline-none focus:ring-2 focus:ring-finsim-light"
            : "bg-gray-100 text-gray-500 cursor-not-allowed"}
        `}
      />
      <button
        onClick={onToggleClick}
        disabled={team !== "team2"}
        className={`
          transition-all duration-200 ease-in-out px-4 py-2 rounded-md text-sm font-semibold shadow-md
          ${term.status === "OK"
            ? "bg-finsim-ok hover:bg-finsim-ok/90 text-white"
            : "bg-finsim-warn hover:bg-finsim-warn/90 text-gray-900"}
          ${team === "team2" ? "cursor-pointer" : "cursor-not-allowed opacity-50"}
        `}
      >
        {term.status}
      </button>
    </div>
  );
}