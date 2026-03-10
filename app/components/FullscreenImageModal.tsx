"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

type Props = {
  src: string | null;
  alt?: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function FullscreenImageModal({ src, alt = "", isOpen, onClose }: Props) {
  // lock scroll
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  // close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen || !src) return null;

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/80 px-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      {/* close button */}
      <button
        type="button"
        className="absolute top-5 right-5 p-2 rounded-full bg-black/20 hover:bg-black/30 z-50"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Close image"
      >
        <X size={20} className="text-white" />
      </button>

      {/* image container */}
      <div
        className="max-w-full max-h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* use <img> so it fills the space and isn't cropped by fixed width/height */}
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-[90vh] object-contain rounded"
          draggable={false}
        />
      </div>
    </div>
  );
}