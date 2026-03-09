"use client";

import Navbar from "./Navbar";
import { useEffect, useMemo, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { useAppFlow } from "../context/AppFlowContext";

export default function IntroduceYourselfScreen() {
  const { goBack, getSelfPlayer, saveSelfPlayer } = useAppFlow();

  const fileRef = useRef<HTMLInputElement | null>(null);

  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const [funFact, setFunFact] = useState("");
  const [tableNumber, setTableNumber] = useState("");

  useEffect(() => {
    const me = getSelfPlayer();
    if (!me) return;
  
    setName(me.name);
    setTag(me.username);
    const picture = me.picture || "";
    const isPlaceholder = picture.includes("placeholder") || picture.includes("text=Player") || picture.includes("image-missing.svg");
    setPhotoUrl(isPlaceholder ? "" : picture);
    setFunFact(me.funFact ?? "");
    setTableNumber(me.tableNumber != null ? String(me.tableNumber) : "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const canSave = useMemo(() => {
    return name.trim().length > 0 && tag.trim().length > 0;
  }, [name, tag]);

  function onPickPhotoClick() {
    fileRef.current?.click();
  }

  function onPhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPhotoUrl(url);
  }

  function onSave() {
    if (!canSave) return;

    const tableNum = tableNumber.trim();
    const parsedTableNumber = tableNum ? parseInt(tableNum, 10) : undefined;

    saveSelfPlayer({
      name: name.trim(),
      username: tag.trim(),
      picture: photoUrl || "https://www.svgrepo.com/show/451667/image-missing.svg",
      funFact: funFact.trim() ? funFact.trim() : undefined,
      tableNumber: parsedTableNumber,
      tableNumberUpdatedAt: parsedTableNumber != null ? Date.now() : undefined,
    });

    goBack();
  }

  return (
    <div className="min-h-screen bg-bg-main text-black flex flex-col screen-transition">
      <Navbar />

      <div className="px-8 pt-6">
        <h2 className="text-2xl font-semibold leading-snug mb-6">
          Introduce Yourself
        </h2>

        <p className="text-lg font-semibold text-black mb-1">Cosmic Heroes:</p>
        <p className="text-gray-700 mb-6">Saturday One Piece TCG Locals</p>

        <div className="flex items-start gap-4 mb-8">
          <button
            type="button"
            onClick={onPickPhotoClick}
            className="w-[92px] h-[92px] rounded-xl bg-gray-300/60 flex items-center justify-center shrink-0 overflow-hidden ring-1 ring-black/5 active:scale-[0.98] transition"
            aria-label="Add a profile photo"
          >
            {photoUrl && !photoUrl.includes("image-missing.svg") ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photoUrl}
                alt="Selected profile photo"
                className="w-full h-full object-cover"
                draggable={false}
              />
            ) : (
              <Plus size={28} strokeWidth={2.25} className="text-black/60" />
            )}
          </button>

          <div className="pt-2">
            <p className="text-sm font-semibold text-black">
              Add an image
            </p>
            <p className="text-sm italic text-black/60 leading-snug">
              This will help you and other players during the event [optional]
            </p>
          </div>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={onPhotoChange}
            className="hidden"
          />
        </div>

        <div className="space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Add your name"
            className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
          />

          <input
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="Add your tag from BandaiTCG+"
            className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
          />

          <input
            value={funFact}
            onChange={(e) => setFunFact(e.target.value)}
            placeholder="Fun fact about you [optional]"
            className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
          />

          <input
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            placeholder="Table number [optional]"
            type="number"
            className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>

        <button
          onClick={onSave}
          disabled={!canSave}
          className={[
            "w-full text-base mt-8 py-3 rounded-xl text-center mx-auto transition active:scale-[0.98]",
            canSave
              ? "bg-gray-300 hover:bg-gray-400 text-black"
              : "bg-gray-300/70 text-black/40 cursor-not-allowed",
          ].join(" ")}
        >
          Save
        </button>
      </div>
    </div>
  );
}