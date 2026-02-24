"use client";

import { useAppFlow } from "./context/AppFlowContext";
import WelcomeScreen from "./components/WelcomeScreen";
import ExperienceSelectScreen from "./components/ExperienceSelectScreen";
import MainMenuScreen from "./components/MainMenuScreen";
import CheckInScreen from "./components/CheckInScreen";
import PlayerIntroScreen from "./components/PlayerIntroScreen";
import TradingScreen from "./components/TradingScreen"

export default function Home() {
  const { screen } = useAppFlow();

  switch (screen) {
    case "welcome":
      return <WelcomeScreen />;
    case "experience":
      return <ExperienceSelectScreen />;
    case "mainMenu":
      return <MainMenuScreen />;
    case "checkIn":
      return <CheckInScreen />;
    case "playerIntro":
      return <PlayerIntroScreen />;
    case "trading":
      return <TradingScreen />
    default:
      return null;
  }
}
