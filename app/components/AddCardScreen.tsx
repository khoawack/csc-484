"use client";

import Navbar from "./Navbar";
import { useState, useRef } from "react";
import { useAppFlow } from "../context/AppFlowContext";

type Section = "trading" | "searching" | "selling"

export default function AddCardScreen() {
  const [section, setSection] = useState<Section>("trading");
  const sectionBase = "w-full py-2 rounded-xl border transition-all duration-150";
  const selectedSection = "border-primary text-primary";
  const unselectedSection = "border-gray-300 text-gray-400";

  const [name, setName] = useState("");
  const [set, setSet] = useState("");
  const [desc, setDesc] = useState("");

  const { goBack } = useAppFlow();

  return (
    <div className="min-h-screen bg-bg-main text-black flex flex-col">
      <Navbar />

      <div className="px-8 pt-6">
        <h2 className="text-2xl font-semibold mb-6">Add a card</h2>
        
        <div className="grid grid-cols-3 mt-8 gap-7">
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

        {/* inputs for name, set, and desc */}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mt-8"
          placeholder="Add card name."
        />

        <input
          value={set}
          onChange={(e) => setSet(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mt-8"
          placeholder="Add card set."
        />

        <input
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mt-8"
          placeholder="Add short description."
        />

        {/* this doesn't actually save yet ... if someone wants to work on this */}
        <button
          onClick={() => goBack()}
          className="w-full text-base bg-gray-300 hover:bg-gray-400 transition active:scale-[0.98] mt-8 py-3 rounded-xl text-center mx-auto"
        >
          Save
        </button>
      </div>
    </div>
  );
}