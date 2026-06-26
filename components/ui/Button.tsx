import Link from "next/link";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  disabled?: boolean;
};

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-bold transition";

  const styles = {
    primary: "bg-white text-black hover:bg-gray-200",
    secondary: "border border-white/20 text-white hover:bg-white/10",
    ghost: "text-white hover:text-gray-300",
  };

  const classes = `${base} ${styles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}