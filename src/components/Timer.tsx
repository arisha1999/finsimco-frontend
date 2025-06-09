// components/Timer.tsx
import React from "react";
import { useStore } from "../store/team_store";

export default function Timer() {
  const timerSeconds = useStore((s) => s.timerSeconds);

  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;

  return (
    <div className="text-lg bg-gray-200 rounded px-3 py-1 w-max">
      Timer: {minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")}
    </div>
  );
}