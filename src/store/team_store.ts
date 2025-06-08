import { create } from "zustand";
import { BroadcastChannel } from "broadcast-channel";

export type Team = "team1" | "team2";

export interface Term {
  id: string;
  name: string;
  value: number | null;
  status: "TBD" | "OK";
}

interface AppState {
  team: Team;
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

// Create broadcast channel for sync info
const bc = new BroadcastChannel<{
  type: string;
  payload: any;
}>("sync-zustand-info");

// Create Zustand
export const useStore = create<AppState>((set, get) => {
  bc.onmessage = (msg) => {
    const { type, payload } = msg;

    if (type === "UPDATE_TERMS") {
      set({ terms: payload });
    } else if (type === "SET_TEAM") {
      set({ team: payload });
    } else if (type === "TICK_TIMER") {
      set({ timerSeconds: payload });
    }
  };

  return {
    team: "team1",
    factorScore: 1.2,
    timerSeconds: 0,
    firstTimeGuidanceShown: false,
    terms: [
      { id: "ebitda", label: "EBITDA", value: null, status: "TBD"},
      { id: "multiple", label: "Multiple", value: null, status: "TBD"},
      { id: "interestRate", label: "Interest Rate", value: null, status: "TBD"},
      { id: "factorScore", label: "Factor Score", value: null, status: "TBD"},
      { id: "companyName", label: "Company Name", value: null, status: "TBD"},
      { id: "description", label: "Description", value: null, status: "TBD"},
    ],
    // Update Term value
    setTermValue: (id, value) => {
      const newTerms = get().terms.map((t) => {
        if (t.id === id && get().team === "team1") {
          return {
            ...t,
            value,
            status: "TBD", // automatically change status if any changes were made by team 1
          };
        }
        return t;
      });
      set({ terms: newTerms });
      bc.postMessage({ type: "UPDATE_TERMS", payload: newTerms });
    },
    // Change Term status
    toggleTermStatus: (id) => {
      const newTerms = get().terms.map((t) =>
        t.id === id && get().team === "team2"
          ? { ...t, status: t.status === "TBD" && t.value !== null ? "OK" : "TBD" }
          : t
      );
      set({ terms: newTerms });
      bc.postMessage({ type: "UPDATE_TERMS", payload: newTerms });
    },
    // Set current used team
    setTeam: (team) =>
      set((state) => {
        return {
          team
        };
    }),
    // Update timer
    tickTimer: () => {
      const newTime = get().timerSeconds + 1;
      set({ timerSeconds: newTime });
      bc.postMessage({ type: "TICK_TIMER", payload: newTime });
    },
    // Update if guidance was shown for the first time
    setFirstTimeGuidanceShown: () => {
      set({ firstTimeGuidanceShown: true });
      bc.postMessage({ type: "SHOW_GUIDANCE", payload: true });
    },
  };
});