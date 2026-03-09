"use client";

import { ChevronLeft } from "lucide-react";
import { useAppFlow } from "../context/AppFlowContext";

export default function Navbar() {
  const { goBack, screen } = useAppFlow();
  const isRoot = screen === "welcome";

  return (
    <div className="sticky top-0 z-10 bg-bg-main/80 backdrop-blur">
      <div className="h-14 flex items-center px-6">
        {!isRoot && (
          <button
            onClick={goBack}
            className="p-2 -ml-2 rounded-full transition active:scale-[0.98] hover:bg-black/5"
            aria-label="Back"
          >
            <ChevronLeft size={26} strokeWidth={2} />
          </button>
        )}
      </div>
      <div className="h-px bg-black/5" />
    </div>
  );
}