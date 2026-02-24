"use client";

import Navbar from "./Navbar";

type Props = {
  onBack?: () => void;
  onNext?: () => void;
};

export default function CheckInScreen({ onBack, onNext }: Props) {
  return (
    <div className="min-h-screen bg-bg-main text-black flex flex-col screen-transition">
      <Navbar />

      <div className="px-8 pt-6">
        <h2 className="text-2xl font-semibold leading-snug mb-6">
          Check-In Process
        </h2>

        <p className="text-gray-700 mb-8">
          todo: check in instructions
        </p>

      </div>
    </div>
  );
}
