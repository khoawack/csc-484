"use client";

import { ChevronLeft } from "lucide-react";
import { useAppFlow } from "../context/AppFlowContext";

export default function Navbar() {
  const { goBack, screen } = useAppFlow();

  const isRoot = screen === "welcome";

  return (
    <div className="flex items-center px-6 pt-6 pb-4 relative text-black">
      {!isRoot && (
        <button
          onClick={goBack}
          className="p-1 transition-all duration-200 active:scale-[0.98]"
        >
          <ChevronLeft size={28} strokeWidth={2} />
        </button>
      )}
    </div>
  );
}
