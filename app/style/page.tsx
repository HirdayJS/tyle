"use client";

import Link from "next/link";
import { useState } from "react";

const quickPrompts = [
    "First Date ❤️",
    "Coffee ☕",
    "Office 💼",
    "Gym 🏋️",
    "Night Out 🌙",
    "Wedding 👔",
    "Vacation ✈️",
    "Party 🎉",
  ];

type FitItem = {
  type?: string;
  name: string;
  detail: string;
};

type Fit = {
  name: string;
  tags: string[];
  items: FitItem[];
  why: string;
  spendLevel: string;
  imagePrompt: string;
  imageUrl?: string;
};

const occasions = [
  { label: "Date", icon: "❤️" },
  { label: "Casual", icon: "☕" },
  { label: "Party", icon: "🎉" },
  { label: "Gym", icon: "🏋️" },
  { label: "Work", icon: "💼" },
  { label: "Travel", icon: "✈️" },
];

const loadingSteps = [
    "Understanding your occasion",
    "Selecting the best silhouette",
    "Matching colours",
    "Balancing proportions",
    "Styling accessories",
    "Generating your AI outfit",
  ];
function OccasionButton({
  selected,
  onClick,
  icon,
  label,
}: {
  selected: boolean;
  onClick: () => void;
  icon: string;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl border px-5 py-5 text-left transition ${
        selected
          ? "border-white bg-white text-black"
          : "border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.08]"
      }`}
    >
      <div className="text-2xl">{icon}</div>
      <div className="mt-2 font-semibold">{label}</div>
    </button>
  );
}

export default function StylePage() {
  const [prompt, setPrompt] = useState("");
  const [fit, setFit] = useState<Fit | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState(0);


  async function generateFit() {
    setLoading(true);
    setFit(null);
    setCurrentStep(0);

const interval = setInterval(() => {
  setCurrentStep((prev) => {
    if (prev >= loadingSteps.length - 1) {
      clearInterval(interval);
      return prev;
    }

    return prev + 1;
  });
}, 900);
    setError("");
    setFit(null);

    try {
      const res = await fetch("/api/generate-fit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setFit(data.fit);
    } catch {
      setError("Failed to generate outfit. Try again.");
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  }

  function saveGeneratedFit() {

    if (!fit) return;

    const saved = JSON.parse(localStorage.getItem("tyle-saved") || "[]");

    const savedFit = {
      title: fit.name,
      vibe: fit.tags.join(" · "),
      emoji: "✨",
      likes: "AI",
      description: fit.why,
    };

    const alreadySaved = saved.some(
      (item: { title: string }) => item.title === savedFit.title
    );

    if (!alreadySaved) {
      localStorage.setItem("tyle-saved", JSON.stringify([...saved, savedFit]));
    }
  }
  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white">
        <section className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-purple-300">
            TYLE AI
          </p>
  
          <h1 className="mt-6 text-5xl font-black">
            Creating your outfit
          </h1>
  
          <p className="mt-5 text-lg leading-8 text-white/50">
            Our AI stylist is building something you&apos;ll actually want to wear.
          </p>
  
          <div className="mt-14 space-y-4 text-left">
            {loadingSteps.map((step, index) => (
              <div
                key={step}
                className={`flex items-center gap-3 rounded-2xl border border-white/10 p-4 transition-all duration-500 ${
                  index <= currentStep
                    ? "bg-white/[0.06] text-white opacity-100"
                    : "bg-white/[0.02] text-white/30 opacity-50"
                }`}
              >
                <span>{index < currentStep ? "✓" : "•"}</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
  
          <div className="mt-10 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-white transition-all duration-700"
              style={{
                width: `${((currentStep + 1) / loadingSteps.length) * 100}%`,
              }}
            />
          </div>
        </section>
      </main>
    );
  }

  if (!fit) {
    return (
      <main className="min-h-screen bg-black pb-28 text-white">
        <section className="mx-auto max-w-6xl px-5 py-6 md:px-8">
          <nav className="flex items-center justify-between">
            <h1 className="text-3xl font-black tracking-tight">TYLE</h1>

            <Link
              href="/"
              className="rounded-full border border-white/10 px-5 py-3 text-sm font-bold text-white hover:bg-white/10"
            >
              Back
            </Link>
          </nav>

          <section className="grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.35em] text-purple-300">
                AI Stylist
              </p>

              <h2 className="max-w-xl text-5xl font-black leading-[0.95] md:text-7xl">
                What are you dressing for?
              </h2>

              <p className="mt-6 max-w-lg text-lg leading-8 text-white/60">
                Pick the occasion. TYLE creates one complete outfit with a
                visual preview and styling breakdown.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 shadow-2xl md:p-8">
            <h3 className="text-xl font-bold">Describe your situation</h3>
            <div className="flex flex-wrap gap-3 mb-6">
  {quickPrompts.map((prompt) => (
    <button
      key={prompt}
      type="button"
      onClick={() => setPrompt(prompt)}
      className="rounded-full border border-white/10 px-4 py-2 text-sm text-white hover:bg-white hover:text-black transition"
    >
      {prompt}
    </button>
  ))}
</div>
<textarea
  value={prompt}
  onChange={(e) => setPrompt(e.target.value)}
  placeholder={`Describe where you're going, the weather, or anything you already own.

    Example:
    
    I'm going on a first date tonight.
    It's around 18°C.
    I only own white sneakers.
    I want to look expensive but not overdressed.`}  className="mt-4 h-48 w-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-white placeholder:text-white/40 focus:border-white/30 focus:outline-none"
/>
                

              <button
                onClick={generateFit}
                disabled={loading}
                className="mt-8 w-full rounded-full bg-white px-6 py-5 text-lg font-black text-black transition hover:bg-white/90 disabled:opacity-60"
              >
                {loading ? "Creating your outfit..." : "✨ Generate Outfit"}
              </button>
              <p className="mt-3 text-center text-sm text-zinc-500">
  AI creates a unique outfit in around 5–10 seconds.
</p>

              {loading && (
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-2/3 animate-pulse rounded-full bg-white" />
                </div>
              )}

              {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
            </div>
          </section>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black pb-52 text-white">
      <section className="mx-auto max-w-7xl px-5 py-6 md:px-8">
        <nav className="flex items-center justify-between">
          <h1 className="text-3xl font-black tracking-tight">TYLE</h1>

          <button
            onClick={() => setFit(null)}
            className="rounded-full border border-white/10 px-5 py-3 text-sm font-bold text-white hover:bg-white/10"
          >
            ✨ New Style
          </button>
        </nav>

        <button
          onClick={() => setFit(null)}
          className="mt-10 text-lg text-white/80 hover:text-white"
        >
          ← Back
        </button>

        <section className="mt-6">
          <p className="text-sm uppercase tracking-[0.35em] text-purple-300">
            AI Stylist
          </p>

          <h2 className="mt-3 text-5xl font-black leading-tight md:text-7xl">
            Here&apos;s your outfit.
          </h2>
        </section>

        <section className="mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]">
          <div className="grid gap-0 lg:grid-cols-[1.2fr_0.9fr]">
            <div className="relative min-h-[420px] border-b border-white/10 bg-gradient-to-br from-white/15 to-white/[0.02] lg:border-b-0 lg:border-r">
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="max-w-md text-center">
                  <div className="text-8xl">{fit.imageUrl ? (
  <img
    src={fit.imageUrl}
    alt={fit.name}
    className="h-full w-full object-cover"
  />
) : (
  <div className="flex h-full items-center justify-center p-8 text-center">
    <p className="text-white/50">Outfit image unavailable</p>
  </div>
)}</div>
                  <p className="mt-5 text-sm uppercase tracking-[0.25em] text-white/40">
                    Outfit image coming next
                  </p>
                  <p className="mt-4 text-sm leading-6 text-white/50">
                    {fit.imagePrompt}
                  </p>
                </div>
              </div>

              <div className="absolute bottom-5 left-5 rounded-full bg-black/70 px-4 py-2 text-sm font-bold backdrop-blur">
                ✨ AI Generated
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="inline-flex rounded-full border border-purple-400/40 bg-purple-400/10 px-4 py-2 text-sm font-bold text-purple-200">
                ✨ AI Recommended
              </div>

              <h3 className="mt-5 text-4xl font-black">{fit.name}</h3>

              <div className="mt-4 flex flex-wrap gap-2">
                {fit.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/10 px-4 py-2 text-sm text-white/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="my-8 h-px bg-white/10" />

              <h4 className="text-sm uppercase tracking-[0.2em] text-white/50">
                Why it works
              </h4>

              <p className="mt-4 text-lg leading-8 text-white/70">{fit.why}</p>

              <div className="my-8 h-px bg-white/10" />

              <h4 className="text-sm uppercase tracking-[0.2em] text-white/50">
  Outfit Breakdown
</h4>

<div className="mt-5 space-y-4">
  {fit.items.map((item) => (
    <div
      key={item.name}
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
    >
      <p className="text-xs uppercase tracking-[0.25em] text-purple-300">
        {item.type || "Piece"}
      </p>

      <p className="mt-2 text-xl font-black">{item.name}</p>

      <p className="mt-2 text-sm leading-6 text-white/50">
        {item.detail}
      </p>
    </div>
  ))}
</div>              

<div className="mt-8 grid gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
  <p className="text-sm uppercase tracking-[0.2em] text-white/50">
    Style Score
  </p>

  <p className="text-4xl font-black">
     92/100
  </p>

  <p className="text-sm text-white/50">
    {fit.spendLevel}
  </p>
</div>

              <button
                onClick={saveGeneratedFit}
                className="mt-5 w-full rounded-2xl bg-white px-6 py-5 text-lg font-black text-black hover:bg-white/90"
              >
                Bookmark Save Outfit
              </button>
            </div>
          </div>
        </section>

        <section className="mt-8 flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-2xl font-black">Want a different vibe?</h3>
            <p className="mt-2 text-white/50">
              Try again with another occasion or style.
            </p>
          </div>

          <button
            onClick={() => setFit(null)}
            className="rounded-full bg-white px-6 py-4 font-black text-black hover:bg-white/90"
          >
            ✨ New Style
          </button>
        </section>
      </section>
    </main>
  );
}