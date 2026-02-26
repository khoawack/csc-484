"use client";

import Navbar from "./Navbar";

type Props = {
  onBack?: () => void;
  onNext?: () => void;
};

type Step = {
  title: string;
  description: string;
  imgSrc: string;
  imgAlt: string;
  link?: string;
}

const steps: Step[] = [
  {
    title: "Download the App.",
    description: "This will be used for the official tournament",
    imgSrc: "/checkin/bandai-tcgplus.png",
    imgAlt: "Bandai TCG+ app icon",
    link:   "https://apps.apple.com/us/app/bandai-tcg/id1599299476",
  },
  {
    title: "Create an Account.",
    description: "Follow the in-app instructions for detailed creation.",
    imgSrc: "/checkin/create-account.png",
    imgAlt: "Create account screenshot",
  },
  {
    title: "Navigate to event search.",
    description: 'In “Store Name / Organizer”, enter “Cosmic Heroes”',
    imgSrc: "/checkin/event-search.png",
    imgAlt: "Event search screenshot",
  },
  {
    title: "Apply to Today’s Event!",
    description: "Find the event and submit your application to check in.",
    imgSrc: "/checkin/apply-event.png",
    imgAlt: "Apply to event screenshot",
  },
];

function StepRow({ step }: { step: Step }) {
  return (
    <div className="flex gap-4">
      <div className="w-[92px] shrink-0">
        <div className="aspect-square w-[92px] overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5">
          <img
            src={step.imgSrc}
            alt={step.imgAlt}
            className="h-full w-full object-cover"
            draggable={false}
          />
        </div>
      </div>

      <div className="pt-1">
        <h3 className="text-[15px] font-semibold leading-snug text-black">
          {step.link ? (
            <a
              href={step.link}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-70 text-blue-600"
            >
              {step.title}
            </a>
          ) : (step.title)
          }
        </h3>
        <p className="mt-1 text-sm leading-snug text-black/70">
          {step.description}
        </p>
      </div>
    </div>
  );
}


export default function CheckInScreen({ onBack, onNext }: Props) {
  return (
    <div className="min-h-screen bg-bg-main text-black flex flex-col screen-transition">
      <Navbar />

      <div className="px-8 pt-2 pb-10">
        <h1 className="text-2xl font-semibold leading-snug">
          Check in Guide
        </h1>

        <p className="mt-2 text-base font-semibold text-black/80">
          Every Saturday at 2pm
        </p>

        <p className="mt-3 text-sm leading-relaxed text-black/70 max-w-[40ch]">
          All tournament activity is done within BandaiTCG+
        </p>

        <div className="mt-8 space-y-7">
          {steps.map((s) => (
            <StepRow key={s.title} step={s} />
          ))}
        </div>

        {/* Optional bottom actions if you want Next/Back buttons on this screen */}
        {(onBack || onNext) && (
          <div className="mt-10 flex items-center justify-between">
            <button
              type="button"
              onClick={onBack}
              className="rounded-xl px-4 py-2 text-sm font-semibold text-black/80 hover:bg-black/5"
            >
              Back
            </button>
            <button
              type="button"
              onClick={onNext}
              className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-black/90"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
