import { create } from "zustand";
import { BroadcastChannel } from "broadcast-channel";
import React, { useEffect } from "react";
export type Team = "team1" | "team2";

export interface Term {
  id: string;
  name: string;
  value: string;
  status: "TBD" | "OK";
}

interface AppState {
  team: Team;
  terms: Term[];
  factorScore: number;
  timerSeconds: number;
  firstTimeGuidanceShown: boolean;

  gifUrl: string;
  longText: string;

  setTermValue: (id: string, value: string) => void;
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
  const createGif = async () => {
    try {
      const url = `https://tenor.googleapis.com/v2/search?q=funny&key=AIzaSyCSbtIbWlNjppotUcP2KJVwURBrmmJjYC4&client_key=my_test_app&limit=1&random=true`;
      const response = await fetch(url);
      const data = await response.json();
      const gif = data?.results?.[0]?.media_formats?.mp4?.url;
      if (gif) {
        set({ gifUrl: gif });
        bc.postMessage({ type: "SET_GIF", payload: gif });
      }
    } catch (error) {
      console.error("Error getting gif:", error);
    }
  };
  const createLongText = async () => {
    try {
      const response = await fetch("https://baconipsum.com/api/?type=memes&paras=5&format=text");
      if (!response.ok) throw new Error("Problem fetching random text");
      const result = await response.text();
      set({ longText: result });
      bc.postMessage({ type: "SET_LONG_TEXT", payload: result });
    } catch (error) {
      console.error("Error fetching random text:", error);
      set({ longText: "" });
    }
  };
  createGif();
  createLongText();
  bc.onmessage = (msg) => {
    const { type, payload } = msg;

    if (type === "UPDATE_TERMS") {
      set({ terms: payload });
    } else if (type === "SET_TEAM") {
      set({ team: payload });
    } else if (type === "TICK_TIMER") {
      set({timerSeconds: payload});
    } else if (type === "SET_GIF") {
      set({ gifUrl: payload });
    } else if (type === "SET_LONG_TEXT") {
      set({ longText: payload });
    }
  };
  return {
    team: "team1",
    factorScore: 1.2,
    timerSeconds: 0,
    gifUrl: "",
    longText: "",
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
    },
  };
});