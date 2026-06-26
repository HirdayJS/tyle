"use client";

import Link from "next/link";
import { useState } from "react";

type FitItem = {
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
};

const occasions = [
  { label: "Date", icon: "❤️" },
  { label: "Casual", icon: "☕" },
  { label: "Party", icon: "🎉" },
  { label: "Gym", icon: "🏋️" },
  { label: "Work", icon: "💼" },
  { label: "Travel", icon: "✈️" },
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
  const [occasion, setOccasion] = useState("Date");
  const [fit, setFit] = useState<Fit | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generateFit() {
    setLoading(true);
    setError("");
    setFit(null);

    try {
      const res = await fetch("/api/generate-fit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ occasion }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setFit(data.fit);
    } catch {
      setError("Failed to generate outfit. Try again.");
    } finally {
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
              <h3 className="text-xl font-bold">Choose occasion</h3>

              <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
                {occasions.map((item) => (
                  <OccasionButton
                    key={item.label}
                    selected={occasion === item.label}
                    onClick={() => setOccasion(item.label)}
                    icon={item.icon}
                    label={item.label}
                  />
                ))}
              </div>

              <button
                onClick={generateFit}
                disabled={loading}
                className="mt-8 w-full rounded-full bg-white px-6 py-5 text-lg font-black text-black transition hover:bg-white/90 disabled:opacity-60"
              >
                {loading ? "Creating your outfit..." : "✨ Style Me"}
              </button>

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
    <main className="min-h-screen bg-black pb-32 text-white">
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

          <p className="mt-4 max-w-xl text-lg leading-8 text-white/60">
            {fit.why}
          </p>
        </section>

        <section className="mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]">
          <div className="grid gap-0 lg:grid-cols-[1.2fr_0.9fr]">
            <div className="relative min-h-[520px] border-b border-white/10 bg-gradient-to-br from-white/15 to-white/[0.02] lg:border-b-0 lg:border-r">
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="max-w-md text-center">
                  <div className="text-8xl">🧍‍♂️</div>
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
                Items
              </h4>

              <div className="mt-5 space-y-4">
                {fit.items.map((item) => (
                  <div key={item.name} className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-2xl">
                      👕
                    </div>

                    <div>
                      <p className="font-bold">{item.name}</p>
                      <p className="text-sm text-white/50">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-white/10 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-white/50">
                  Spend level
                </p>
                <p className="mt-2 text-lg font-bold">{fit.spendLevel}</p>
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