"use client";

import Image from "next/image";
import { useAppFlow } from "../context/AppFlowContext";

export default function WelcomeScreen() {
  const { navigate } = useAppFlow();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-slate-50 text-black px-10 pt-8 screen-transition">
      {/* Header */}
      <div className="pb-5">
        <h1 className="text-3xl font-semibold tracking-tight">Welcome</h1>
        
        <div className="mt-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Cosmic Heroes • 
          <span className="text-slate-500 font-medium"> One Piece TCG</span>
          </h2>
          {/* <p className="mt-1 text-sm text-slate-600">Saturday One Piece TCG Locals</p> */}
          </div>
      </div>

      <div className="rounded-2xl overflow-hidden shadow-md">
        <Image
          src="https://i.ytimg.com/vi/CPtEyY3GPVQ/hq720.jpg"
          alt="Cosmic Heroes Banner"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto rounded-xl"
        />
      </div>

      <div className="pt-4 text-sm flex flex-col">
        <p>
          <strong>Location:</strong> San Luis Obispo
        </p>

        <p className="mt-5 mb-8">
          Join us for an exciting Saturday of One Piece TCG action at Cosmic
          Heroes! Whether you're a seasoned pirate or just starting your
          journey, our weekly locals event is the perfect place to test your
          deck, meet fellow players, and compete for prizes in a fun and
          welcoming environment.
        </p>

        <p className="mb-6">
          Get ready, trade cards, and feel comfortable before this event starts.
        </p>

        <button
          onClick={() => navigate("experience")}
          className="w-full text-base bg-primary hover:opacity-90 text-white transition-all duration-200 active:scale-[0.98] py-3 rounded-xl text-center"
        >
          Start
        </button>
      </div>
    </div>
  );
}