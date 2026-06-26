import Link from "next/link";

export default function Profile() {
  return (
    <main className="min-h-screen bg-black px-6 py-8 text-white">
      <h1 className="text-3xl font-black">Profile</h1>
      <p className="mt-4 text-white/50">Your style profile will appear here.</p>
      <Link href="/" className="mt-8 inline-block rounded-full bg-white px-5 py-3 font-bold text-black">
        Back to Explore
      </Link>
    </main>
  );
}