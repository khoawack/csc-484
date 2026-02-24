"use client";

import { useState } from "react";
import Navbar from "./Navbar";

type ExperienceType = "new" | "returning";

type Props = {
  onNext?: (value: ExperienceType) => void;
  onBack?: () => void;
};

export default function ExperienceSelectScreen({ onNext, onBack }: Props) {
  const [selected, setSelected] = useState<ExperienceType | null>(null);

  const optionStyle = (value: ExperienceType) =>
    `w-full border rounded-xl py-4 px-4 text-left transition-all duration-200 ease-in-out active:scale-[0.98] ${
      selected === value
        ? "bg-white text-primary border-primary"
        : "bg-white text-black border-gray-300"
    }`;

  return (
    <div className="min-h-screen bg-bg-main text-black flex flex-col screen-transition">
      <Navbar onBack={onBack} />

      <div className="px-8 pt-6">
        <h2 className="text-2xl font-semibold leading-snug mb-10 text-black">
          How familiar are you with One Piece TCG Events?
        </h2>

        <div className="space-y-6">
          <button
            onClick={() => setSelected("new")}
            className={optionStyle("new")}
          >
            I’m New / Still Learning
          </button>

          <button
            onClick={() => setSelected("returning")}
            className={optionStyle("returning")}
          >
            I’ve been here before
          </button>
        </div>

        <button
          disabled={!selected}
          onClick={() => selected && onNext?.(selected)}
          className={`w-full mt-12 py-3 rounded-xl transition-all duration-200 ${
            selected
              ? "bg-primary text-white hover:opacity-90 active:scale-[0.98]"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
