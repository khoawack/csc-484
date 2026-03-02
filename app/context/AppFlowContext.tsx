"use client";

import { createContext, useContext, useState } from "react";

export type Screen =
  | "welcome"
  | "experience"
  | "mainMenu"
  | "checkIn"
  | "checkInDetails"
  | "playerIntro"
  | "trading"
  | "addCard"
  | "introduce";

type ExperienceType = "new" | "returning" | null;

export type Player = {
  id: number;
  name: string;
  username: string;
  picture: string;
};

type AppFlowContextType = {
  screen: Screen;
  navigate: (screen: Screen) => void;
  goBack: () => void;
  resetTo: (screen: Screen) => void;
  experience: ExperienceType;
  setExperience: (e: ExperienceType) => void;
  menuStep: number;
  unlock: (step: number) => void;
  players: Player[];
  addPlayer: (player: Omit<Player, "id">) => void;
};

const AppFlowContext = createContext<AppFlowContextType | null>(null);

export function AppFlowProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<Screen[]>(["welcome"]); // prev page stack

  const screen = history[history.length - 1];

  const [experience, setExperience] = useState<ExperienceType>(null);
  const [menuStep, setMenuStep] = useState(0);

  // Global Player List
  const [players, setPlayers] = useState<Player[]>([
    {
      id: 1,
      name: "John Doe",
      username: "snorlaxlover.123",
      picture:
        "https://i.pinimg.com/736x/f4/31/76/f43176cf062903a487363184ef571a2b.jpg",
    },
    {
      id: 2,
      name: "Jill Doe",
      username: "dittolover.234",
      picture: "https://pbs.twimg.com/media/EjXk-3kWkAAsltL.jpg",
    },
    {
      id: 3,
      name: "Jane Doe",
      username: "pikachulover.567",
      picture:
        "https://i.pinimg.com/474x/27/4b/86/274b8668ce3435062eed1fe88bec6817.jpg",
    },
  ]);

  function navigate(next: Screen) {
    setHistory((prev) => [...prev, next]);
  }

  function goBack() {
    setHistory((prev) => {
      if (prev.length <= 1) return prev;
      return prev.slice(0, -1);
    });
  }

  function resetTo(target: Screen) {
    setHistory([target]);
  }

  function unlock(step: number) {
    setMenuStep((prev) => Math.max(prev, step));
  }

  // Helper
  function addPlayer(player: Omit<Player, "id">) {
    setPlayers((prev) => [
      ...prev,
      {
        id: Date.now(), // simple unique id
        ...player,
      },
    ]);
  }

  return (
    <AppFlowContext.Provider
      value={{
        screen,
        navigate,
        goBack,
        resetTo,
        experience,
        setExperience,
        menuStep,
        unlock,
        players,
        addPlayer,
      }}
    >
      {children}
    </AppFlowContext.Provider>
  );
}

export function useAppFlow() {
  const ctx = useContext(AppFlowContext);
  if (!ctx) {
    throw new Error("useAppFlow must be used inside AppFlowProvider");
  }
  return ctx;
}
