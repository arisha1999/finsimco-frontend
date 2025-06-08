// components/InputField.tsx
import React from "react";
import { Term, useStore } from "../store/team_store";

interface Props {
  term: Term;
}

export default function InputField({ term }: Props) {
  const setTermValue = useStore((s) => s.setTermValue);
  const toggleTermStatus = useStore((s) => s.toggleTermStatus);
  const team = useStore((s) => s.team);

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const num = val === "" ? null : Number(val);
    if (!isNaN(num)) {
      setTermValue(term.id, num);
    }
  };

  const onToggleClick = () => {
    if (team === "team2" && term.canStatusBeChanged) {
      toggleTermStatus(term.id);
    }
  };

  return (
    <div className="flex items-center space-x-4 bg-white rounded p-3 shadow-sm">
      <label className="w-32 font-medium">{term.name}</label>
      <input
        type="number"
        value={term.value ?? ""}
        onChange={onValueChange}
        disabled={!(team === "team1" && term.canValueBeChanged)}
        className={`border rounded px-2 py-1 w-24 ${
          team === "team1" && term.canValueBeChanged
            ? "bg-white"
            : "bg-gray-100 cursor-not-allowed"
        }`}
      />
      <button
        onClick={onToggleClick}
        disabled={!(team === "team2" && term.canStatusBeChanged)}
        className={`px-3 py-1 rounded font-semibold ${
          term.toggle === "OK"
            ? "bg-green-400 text-white"
            : "bg-yellow-300 text-black"
        } ${team === "team2" && term.canStatusBeChanged ? "cursor-pointer" : "cursor-not-allowed opacity-50"}`}
      >
        {term.toggle}
      </button>
    </div>
  );
}