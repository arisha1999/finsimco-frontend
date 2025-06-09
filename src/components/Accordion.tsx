// components/Accordion.tsx
import React, { useState, useEffect } from "react";
import { useStore } from "../store/team_store";

const guidanceText = `Welcome to the simulation. This is your first-time guidance section. It contains important information up to 500 characters. This text will be shown only once and collapsed afterwards to improve your experience during the negotiation simulation. Enjoy!`;

export default function Accordion() {
  const [open, setOpen] = useState(false);
  const firstTimeShown = useStore((s) => s.firstTimeGuidanceShown);
  const setFirstTimeGuidanceShown = useStore((s) => s.setFirstTimeGuidanceShown);

  useEffect(() => {
    if (!firstTimeShown) {
      setOpen(true);
      setFirstTimeGuidanceShown();
    }
  }, [firstTimeShown, setFirstTimeGuidanceShown]);

  return (
    <section className="border rounded bg-white rounded-lg p-4 shadow-md w-full">
      <button
        className="text-left w-full"
        onClick={() => setOpen((o) => !o)}
      >
        First Time Guidance {open ? "▲" : "▼"}
      </button>
      {open && <p className="mt-2 text-gray-700">{guidanceText}</p>}
    </section>
  );
}