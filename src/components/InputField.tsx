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
  let val = e.target.value;
  const id = term.id;

  if (["ebitda", "multiple", "interestRate"].indexOf(id) >= 0) {
    let num = parseFloat(val);
    if (!isNaN(num)) {
      if (num < 0) num = 0;
      if (id === "interestRate" && num > 100) num = 100;
      val = num.toString();
    } else {
      setTermValue(id, "");
      return;
    }
  }
  setTermValue(id, val);
};
  return (
    <div className="flex items-center justify-between gap-4 bg-white rounded-lg p-4 shadow-md">
      <label className="w-20 text-gray-700">{term.label}</label>
      <div className="relative w-full">
            {term.id === "factorScore" ? (
              <div className="relative w-full px-2">
                <div className="flex justify-between mb-2 px-1 text-sm text-gray-600">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <span key={val} className="w-5 text-center">{val}</span>
                  ))}
                </div>

                <div className="relative h-8 flex items-center justify-between px-[6px]">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <div
                      key={val}
                      onClick={() => team === "team1" && setTermValue(term.id, val.toString())}
                      className={`
                        w-4 h-4 rounded-full transition-all duration-200 cursor-pointer
                        ${team !== "team1" ? "cursor-not-allowed opacity-40" : ""}
                        ${val.toString() === term.value
                          ? "bg-gray-500 scale-150 shadow-md"
                          : "bg-gray-300 hover:bg-finsim-light"}
                      `}
                    />
                  ))}
                </div>
              </div>
            ) : (
            <>
                <input
                  value={term.value ?? ""}
                  onChange={onValueChange}
                  disabled={team !== "team1"}
                  min={term.id === "interestRate" ? 0 : undefined}
                  max={term.id === "interestRate" ? 100 : undefined}
                  className={`
                    border rounded-md px-3 py-2 w-full text-sm shadow-sm transition-all duration-200
                    ${team === "team1"
                      ? "bg-white focus:outline-none focus:ring-2 focus:ring-finsim-light"
                      : "bg-gray-100 text-gray-500 cursor-not-allowed"}
                  `}
                />
                {/* Show %, if interestRate */}
                {term.id === "interestRate" && (
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 select-none">
                    %
                  </span>
                )}
                {/* Show $, if ebitda */}
                {term.id === "ebitda" && (
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 select-none">
                    $
                  </span>
                )}
                {/* Show %, if multiple */}
                {term.id === "multiple" && (
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 select-none">
                    x
                  </span>
                )}
            </>
        )}
      </div>
      <button
        onClick={() => team === "team2" && toggleTermStatus(term.id)}
        disabled={team !== "team2"}
        className={`
          transition-all duration-200 ease-in-out px-4 py-2 rounded-md text-sm shadow-md w-20
          ${term.status === "OK"
            ? "bg-ok hover:bg-finsim-ok/90 text-white"
            : "bg-warn hover:bg-finsim-warn/90 text-gray-900"}
          ${team === "team2" ? "cursor-pointer" : "cursor-not-allowed opacity-50"}
        `}
      >
        {term.status}
      </button>
    </div>
  );
}