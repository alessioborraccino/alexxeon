"use client";
import { useState } from "react";
import Link from "next/link";
export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <Link href="/" aria-label="Alexx Eon home" onClick={() => setOpen(false)}>
        <img
          src="/full-logo-white.png"
          width="314"
          height="48"
          alt="Alexx Eon"
        />
      </Link>
      <button
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="main-navigation"
        onClick={() => setOpen(!open)}
      >
        Menu
      </button>
      <nav
        id="main-navigation"
        aria-label="Main navigation"
        className={open ? "navigation open" : "navigation"}
      >
        <Link href="/" onClick={() => setOpen(false)}>
          Home
        </Link>
        <Link href="/#music" onClick={() => setOpen(false)}>
          Music
        </Link>
        <Link href="/bio/" onClick={() => setOpen(false)}>
          Bio
        </Link>
      </nav>
    </header>
  );
}
