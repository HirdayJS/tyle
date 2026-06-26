import Link from "next/link";
import { outfits } from "@/lib/data/outfits";
import OutfitCard from "@/components/outfit/OutfitCard";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function OutfitDetail({ params }: Props) {
  const { id } = await params;

  const outfit = outfits.find((item) => String(item.id) === id);

  if (!outfit) {
    return (
      <main className="min-h-screen bg-black px-6 py-8 text-white">
        <h1 className="text-3xl font-black">Outfit not found</h1>

        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-white px-5 py-3 font-bold text-black"
        >
          Back to Discover
        </Link>
      </main>
    );
  }

  const relatedOutfits = outfits
    .filter(
      (item) =>
        item.id !== outfit.id &&
        item.filters.some((filter) => outfit.filters.includes(filter))
    )
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-black pb-28 text-white">
      <section className="mx-auto max-w-6xl px-5 py-6 md:px-8">
        <Link href="/" className="text-sm text-white/60 hover:text-white">
          ← Back to Discover
        </Link>

        <section className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-[2rem]">
            <img
              src={outfit.image}
              alt={outfit.title}
              className="h-[680px] w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-sm text-white/50">
              {outfit.filters.join(" · ")}
            </p>

            <h1 className="mt-3 text-5xl font-black leading-tight md:text-6xl">
              {outfit.title}
            </h1>

            <p className="mt-4 text-white/50">Curated by {outfit.creator}</p>

            <p className="mt-8 text-lg leading-8 text-white/70">
              {outfit.description}
            </p>

            <div className="my-8 h-px bg-white/10" />

            <h2 className="text-sm uppercase tracking-[0.3em] text-white/40">
              Perfect for
            </h2>

            <div className="mt-4 flex flex-wrap gap-3">
              {outfit.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="my-8 h-px bg-white/10" />

            <div className="grid gap-3">
              <button className="rounded-full border border-white/10 px-6 py-4 font-black text-white hover:bg-white/10">
                ❤️ Save Inspiration
              </button>

              <Link
                href="/style"
                className="rounded-full bg-white px-6 py-4 text-center font-black text-black hover:bg-white/90"
              >
                ✨ Make This Mine
              </Link>
            </div>

            <p className="mt-6 text-sm text-white/40">
              ❤️ {outfit.likes} saves and likes
            </p>
          </div>
        </section>

        {relatedOutfits.length > 0 && (
          <section className="mt-20">
            <p className="text-sm uppercase tracking-[0.3em] text-white/40">
              Keep exploring
            </p>

            <h2 className="mt-2 text-4xl font-black">You might also like</h2>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {relatedOutfits.map((related) => (
                <OutfitCard key={related.id} outfit={related} />
              ))}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}