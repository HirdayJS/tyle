import Link from "next/link";
import Button from "./Button";

export default function Header() {
  return (
    <header className="flex items-center justify-between py-6">
      <Link
        href="/"
        className="text-3xl font-black tracking-tight"
      >
        TYLE
      </Link>

      <Button href="/style">
        ✨ Create
      </Button>
    </header>
  );
}