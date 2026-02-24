"use client";

import { ChevronLeft } from "lucide-react";

type NavbarProps = {
  onBack?: () => void;
  title?: string;
};

export default function Navbar({ onBack, title }: NavbarProps) {
  return (
    <div className="flex items-center px-6 pt-6 pb-4 relative text-black">
      {onBack && (
        <button onClick={onBack} className="p-1 transition-all duration-200 active:scale-[0.98]">
          <ChevronLeft size={28} strokeWidth={2} />
        </button>
      )}

      {title && (
        <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold">
          {title}
        </h1>
      )}
    </div>
  );
}
