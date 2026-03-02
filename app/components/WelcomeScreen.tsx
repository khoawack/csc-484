"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { useAppFlow } from "../context/AppFlowContext";

export default function WelcomeScreen() {
  const { navigate } = useAppFlow();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-slate-50 text-black px-10 pt-8 screen-transition">
      
      {/* Header */}
      <div className="pb-5">
        <h1 className="text-3xl font-semibold tracking-tight">
          Welcome
        </h1>
        
        <div className="mt-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Cosmic Heroes • 
            <span className="text-slate-500 font-medium"> 
              One Piece TCG
            </span>
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

    {/* Our Content ~ */}
      <div className="pt-6 text-sm flex flex-col flex-grow">
        { /* Info card */ }
        <div className="rounded-2xl bg-white/80 backdrop-blur border border-slate-200 shadow-sm p-4">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4" />
            <span className="font-medium">San Luis Obispo</span>
          </div>

          <p className="mt-3 text-sm text-slate-700">
            Join us for our exciting One Piece TCG event!
          </p>

          <p className="mt-3 text-sm text-slate-700">
            Whether you're a seasoned pirate or just starting, our weekly locals are a great way to be involved with the game. Here, you can...
          </p>

          <ul className="mt-3 space-y-1 text-sm text-slate-700">
            <li>• Meet fellow players</li>
            <li>• Look and trade for cards</li>
            <li>• Learn how to sign up for tournaments</li>
            <li>• Compete for prizes</li>
          </ul>
        </div>

        {/* <p className="mt-2 text-sm text-slate-700 p-3 text-center">
          Let's get ready for the event and connect with the other players!
        </p> */}

        <div className="mt-auto pt-6 pb-6">
          <button
              onClick={() => navigate("experience")}
              className="w-full text-base font-semibold bg-primary text-white
                        py-3 rounded-2xl shadow-md
                        transition-all duration-200
                        hover:brightness-95 active:scale-[0.98]"
            > Let's begin!
          </button>

          <p className="mt-3 text-xs text-slate-500 text-center">
              You can always come back to this guide after today 😄
          </p>
        </div>
        
      </div>
    </div>
  );
}