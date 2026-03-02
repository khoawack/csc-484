"use client";

import Navbar from "./Navbar";
import { useState } from "react";
import { useAppFlow } from "../context/AppFlowContext";

type Section = "trading" | "searching" | "selling"
export default function TradingScreen() {
  const { navigate } = useAppFlow();

  const [section, setSection] = useState<Section>("trading");

  const sectionBase = "underline underline-offset-8"

  const selectedSection = "text-black transition-all duration-150";

  const unselectedSection = "text-gray-400 transition-all duration-150";
  
  return (
    <div className="min-h-screen bg-bg-main text-black flex flex-col screen-transition">
      <Navbar />

      <div className="px-8 pt-6">
        {section === "trading" && <h2 className="text-2xl font-semibold leading-snug mb-6">Trading List</h2>}
        {section === "searching" && <h2 className="text-2xl font-semibold leading-snug mb-6">Searching List</h2>}
        {section === "selling" && <h2 className="text-2xl font-semibold leading-snug mb-6">Selling List</h2>}
    
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Cosmic Heroes :</h2>
          <p className="text-gray-700">Saturday One Piece TCG Locals</p>
        </div>

        <div className="grid grid-cols-3 mb-6">
          <button 
            onClick={() => setSection("trading")}
            className={`${sectionBase} ${section === "trading" ? selectedSection : unselectedSection}`}
          >
            Trading
          </button>
          <button 
            onClick={() => setSection("searching")}
            className={`${sectionBase} ${section === "searching" ? selectedSection : unselectedSection}`}
          >
            Searching
          </button>
          <button
            onClick={() => setSection("selling")}
            className={`${sectionBase} ${section === "selling" ? selectedSection : unselectedSection}`}
          >
            Selling
          </button>
        </div>

        {section === "trading" && <p className="text-gray-700 mb-8">todo: trading list content</p>}
        {section === "searching" && <p className="text-gray-700 mb-8">todo: searching list content</p>}
        {section === "selling" && <p className="text-gray-700 mb-8">todo: selling list content</p>}

        <button
          onClick={() => navigate("addCard")} 
          className="w-full text-base bg-gray-300 hover:bg-gray-400 transition active:scale-[0.98] mt-8 py-3 rounded-xl text-center mx-auto">Add a card
        </button>

      </div>
    </div>
  );
}
