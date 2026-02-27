"use client";

import Navbar from "./Navbar";
import { useState } from "react";
import { useAppFlow } from "../context/AppFlowContext";

type Section = "trading" | "searching" | "selling"
export default function TradingScreen() {
  const [section, setSection] = useState<Section>("trading");
  
  return (
    <div className="min-h-screen bg-bg-main text-black flex flex-col screen-transition">
      <Navbar />

      <div className="px-8 pt-6">
        <h2 className="text-2xl font-semibold leading-snug mb-6">
          Trading List
        </h2>
    
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Cosmic Heroes :</h2>
          <p className="text-gray-700">Saturday One Piece TCG Locals</p>
        </div>

        <div className="grid grid-cols-3 mb-6">
          <button className="underline underline-offset-8">
            Trading
          </button>
          <button className="underline underline-offset-8">
            Searching
          </button>
          <button className="underline underline-offset-8">
            Selling
          </button>
        </div>

        <p className="text-gray-700 mb-8">todo: trading list content</p>
        <button className="w-full mt-12 py-3 rounded-xl bg-gray-200 hover:bg-gray-400 transition-all duration-300">Add a card</button>
      </div>
    </div>
  );
}
