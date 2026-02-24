"use client";

import { useState } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import ExperienceSelectScreen from "./components/ExperienceSelectScreen";
import MainMenuScreen from "./components/MainMenuScreen";

export default function Home() {
  const [step, setStep] = useState(0);
  const [experience, setExperience] = useState<"new" | "returning" | null>(
    null
  );

  if (step === 0) return <WelcomeScreen key="welcome" onStart={() => setStep(1)} />;

  if (step === 1)
    return (
      <ExperienceSelectScreen
        key="experience"
        onBack={() => setStep(0)}
        onNext={(value) => {
          setExperience(value);
          setStep(2);
        }}
      />
    );

  if (step === 2)
    return <MainMenuScreen key="menu" experience={experience} onBack={() => setStep(1)} />;

  return null;
}
