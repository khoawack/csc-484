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

export type ListingType =
    | "trade"
    | "sell"
    | "search"

export type Section = "trading" | "searching" | "selling"

export type Listing = {
    id: number;
    name: string;
    set: string;
    description: string;
    type: ListingType;
    image: string;
}


type ExperienceType = "new" | "returning" | null;

export type Player = {
  id: number;
  name: string;
  username: string;
  picture: string;
  funFact?: string;
};

type AppFlowContextType = {
  screen: Screen;
  navigate: (screen: Screen) => void;
  goBack: () => void;
  resetTo: (screen: Screen) => void;
  resetAll: () => void;
  experience: ExperienceType;
  setExperience: (e: ExperienceType) => void;
  menuStep: number;
  unlock: (step: number) => void;
  listings: Listing[];
  addListing: (listing: Listing) => void;
  removeListing: (id: number) => void;
  section: Section;
  setSection: (section: Section) => void;
  players: Player[];
  addPlayer: (player: Omit<Player, "id">) => void;
  selfPlayerId: number | null;
  getSelfPlayer: () => Player | null;
  saveSelfPlayer: (player: Omit<Player, "id">) => void;
  deleteSelfPlayer: () => void;
  toast: string | null;
  showToast: (msg: string) => void;
};

const AppFlowContext = createContext<AppFlowContextType | null>(null);

export function AppFlowProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<Screen[]>(["welcome"]); // prev page stack
  const [listings, setListings] = useState<Listing[]>([])

  const screen = history[history.length - 1];

  const [experience, setExperience] = useState<ExperienceType>(null);
  const [menuStep, setMenuStep] = useState(0);
  const [section, setSection] = useState<Section>("trading");

  const [selfPlayerId, setSelfPlayerId] = useState<number | null>(null);

  const [toast, setToast] = useState<string | null>(null);

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

  function resetAll() {
    // reset all states
    setHistory(["welcome"]);
    setExperience(null);
    setMenuStep(0);
    setListings([]);
    setSection("trading");
    setSelfPlayerId(null);
    setPlayers([
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
  }

  function unlock(step: number) {
    setMenuStep((prev) => Math.max(prev, step));
  }

  function addListing(listing: Listing) {
    setListings((prev) => [...prev, listing]);
  }

  function removeListing(id: number) {
    setListings((prev) => prev.filter((item) => item.id !== id));
  }

  function addPlayer(player: Omit<Player, "id">) {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    setPlayers((prev) => [...prev, { id, ...player }]);
  }

  function getSelfPlayer() {
    if (selfPlayerId == null) return null;
    return players.find((p) => p.id === selfPlayerId) ?? null;
  }

  function saveSelfPlayer(player: Omit<Player, "id">) {
    // If self exists, update it
    if (selfPlayerId != null) {
      setPlayers((prev) =>
        prev.map((p) => (p.id === selfPlayerId ? { ...p, ...player } : p))
      );
      showToast("Profile updated")
      return;
    }
  
    // Otherwise create once and remember its id
    showToast("Profile added")
    const id = Date.now() + Math.floor(Math.random() * 1000); // avoid rare collisions
    setSelfPlayerId(id);
    setPlayers((prev) => [...prev, { id, ...player }]);
  }

  function deleteSelfPlayer() {
    if (selfPlayerId == null) return;
  
    setPlayers((prev) => prev.filter((p) => p.id !== selfPlayerId));
    setSelfPlayerId(null);
    showToast("Profile deleted")
  }

  function showToast(msg: string) {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2000);
  }

  return (
    <AppFlowContext.Provider
      value={{
        screen,
        navigate,
        goBack,
        resetTo,
        resetAll,
        experience,
        setExperience,
        menuStep,
        unlock,
        listings,
        addListing,
        removeListing,
        section,
        setSection,
        players,
        addPlayer,
        selfPlayerId,
        getSelfPlayer,
        saveSelfPlayer,
        deleteSelfPlayer,
        toast,
        showToast,
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
