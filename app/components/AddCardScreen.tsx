"use client";

import Navbar from "./Navbar";
import Image from "next/image";
import { useState, useRef } from "react";
import { useAppFlow } from "../context/AppFlowContext";
import type { ListingType } from "../context/AppFlowContext";

export default function AddCardScreen() {
  const { goBack, addListing, section, setSection } = useAppFlow();
  const sectionBase = "w-full py-2 rounded-xl border transition-all duration-150";
  const selectedSection = "border-primary text-primary";
  const unselectedSection = "border-gray-300 text-gray-400";

  const [name, setName] = useState("");
  const [set, setSet] = useState("");
  const [desc, setDesc] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleImageClick() {
    fileInputRef.current?.click();
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleSave() {
    if (!name.trim() || !set.trim() || !desc.trim()) {
      setMessage("Please fill in the fields")
      return
    }
    
    const newListing = {
      id: Date.now(),
      name: name,
      set: set,
      description: desc,
      type: (section === "trading" ? "trade" : section === "searching" ? "search" : "sell") as ListingType,
      image: image || "https://www.svgrepo.com/show/451667/image-missing.svg",
    };

    addListing(newListing);

    setName("");
    setSet("");
    setDesc("");
    setImage("");

    goBack();
  }

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

        {/* img upload */}
        <div className="flex justify-center mt-8">
          <div 
            onClick={handleImageClick}
            className="w-48 h-48 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 hover:border-primary cursor-pointer flex items-center justify-center overflow-hidden transition-colors"
          >
            {image ? (
              <Image
                src={image}
                alt="Card preview"
                width={192}
                height={192}
                className="w-full h-full object-cover"
                unoptimized={image.startsWith('data:')}
              />
            ) : (
              <div className="text-center">
                <p className="text-gray-400 text-sm">Click to upload image</p>
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
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

        <button
          onClick={handleSave}
          className="w-full text-base bg-gray-300 hover:bg-gray-400 transition active:scale-[0.98] mt-8 py-3 rounded-xl text-center mx-auto"
        >
          Save
        </button>
        {message && (
          <p className="text-red-500 text-center mt-4 text-sm font-medium">{message}</p>
        )}

      </div>
    </div>
  );
}