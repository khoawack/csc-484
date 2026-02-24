"use client";

import { createContext, useContext, useState } from "react";

export type Screen =
  | "welcome"
  | "experience"
  | "mainMenu"
  | "checkIn"
  | "checkInDetails"
  | "playerIntro"
  | "trading";

type ExperienceType = "new" | "returning" | null;

type AppFlowContextType = {
  screen: Screen;
  navigate: (screen: Screen) => void;
  goBack: () => void;
  resetTo: (screen: Screen) => void;
  experience: ExperienceType;
  setExperience: (e: ExperienceType) => void;
  menuStep: number;
  unlock: (step: number) => void;
};

const AppFlowContext = createContext<AppFlowContextType | null>(null);

export function AppFlowProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<Screen[]>(["welcome"]); // prev page stack

  const screen = history[history.length - 1];

  const [experience, setExperience] = useState<ExperienceType>(null);
  const [menuStep, setMenuStep] = useState(0);

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
