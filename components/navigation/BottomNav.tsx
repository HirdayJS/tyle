"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Discover", href: "/" },
  { label: "Stylist", href: "/style" },
  { label: "Saved", href: "/saved" },
  { label: "You", href: "/profile" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-4 left-1/2 z-50 grid w-[92%] max-w-md -translate-x-1/2 grid-cols-4 rounded-full border border-white/10 bg-black/80 p-2 backdrop-blur">
      {navItems.map((item) => {
        const active = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-full px-3 py-3 text-center text-sm font-bold transition ${
              active
                ? "bg-white text-black"
                : "text-white/60 hover:bg-white/10 hover:text-white"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}