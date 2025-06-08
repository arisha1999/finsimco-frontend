// store.ts
import { create } from "zustand";
import { BroadcastChannel } from 'broadcast-channel';

export type Team = "team1" | "team2";

export interface Term {
  id: string;
  name: string;
  value: number | null;
  status: "TBD" | "OK";
  canValueBeChanged: boolean;  // only team 1 can change value
  canStatusBeChanged: boolean;   // only team 2 can change status
}

interface AppState {
  terms: Term[];
  factorScore: number;
  timerSeconds: number;
  firstTimeGuidanceShown: boolean;

  setTermValue: (id: string, value: number) => void;
  toggleTermStatus: (id: string) => void;
  setTeam: (team: Team) => void;
  tickTimer: () => void;
  setFirstTimeGuidanceShown: () => void;
}

export const useStore = create<AppState>((set) => ({
  team: "team1",
  factorScore: 1.2,
  timerSeconds: 0,
  firstTimeGuidanceShown: false,
  terms: [
    { id: "ebitda", name: "EBITDA", value: 100, status: "TBD", canValueBeChanged: true, canStatusBeChanged: false },
    { id: "multiple", name: "Multiple", value: 5, status: "TBD", canValueBeChanged: true, canStatusBeChanged: false },
    { id: "interestRate", name: "Interest Rate", value: 3, status: "TBD", canValueBeChanged: true, canStatusBeChanged: false },
    { id: "factorScore", name: "Factor Score", value: 1.2, status: "TBD", canValueBeChanged: true, canStatusBeChanged: false },
    { id: "companyName", name: "Company Name", value: null, status: "TBD", canValueBeChanged: true, canStatusBeChanged: false },
    { id: "description", name: "Description", value: null, status: "TBD", canValueBeChanged: true, canStatusBeChanged: false },
  ],
  setTermValue: (id, value) =>
    set((state) => ({
      terms: state.terms.map((t) =>
        t.id === id && state.team === "team1" && t.canValueBeChanged
          ? { ...t, value }
          : t
      ),
    })),
  toggleTermStatus: (id) =>
    set((state) => ({
      terms: state.terms.map((t) =>
        t.id === id && state.team === "team2" && t.canStatusBeChanged
          ? { ...t, toggle: t.status === "TBD" ? "OK" : "TBD" }
          : t
      ),
    })),
  setTeam: (team) =>
    set((state) => {
      const canValueBeChanged = team === "team1";
      const canStatusBeChanged = team === "team2";
      return {
        team,
        terms: state.terms.map((t) => ({
          ...t,
          canValueBeChanged,
          canStatusBeChanged,
        })),
      };
    }),
  tickTimer: () =>
    set((state) => ({ timerSeconds: state.timerSeconds + 1 })),
  setFirstTimeGuidanceShown: () =>
    set({ firstTimeGuidanceShown: true }),
}));