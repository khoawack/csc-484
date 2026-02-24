"use client";

import Navbar from "./Navbar";
import { useAppFlow } from "../context/AppFlowContext";


export default function PlayerIntroScreen() {
  return (
    <div className="min-h-screen bg-bg-main text-black flex flex-col screen-transition">
      <Navbar />

      <div className="px-8 pt-6">
        <h2 className="text-2xl font-semibold leading-snug mb-6">
          Meet the Players
        </h2>

        <p className="text-gray-700 mb-8">
          todo: player introduction content
        </p>
      </div>
    </div>
  );
}
