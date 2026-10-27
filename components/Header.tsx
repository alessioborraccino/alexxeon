"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ThemeControl from "./ThemeControl";
export default function Header() {
  const [open, setOpen] = useState(false);
  const [isPortraitMobile, setIsPortraitMobile] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const media = window.matchMedia(
      "(max-width: 650px) and (orientation: portrait)",
    );
    const updateViewport = () => setIsPortraitMobile(media.matches);
    updateViewport();
    media.addEventListener("change", updateViewport);
    return () => media.removeEventListener("change", updateViewport);
  }, []);
  useEffect(() => {
    if (!open) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        menuToggleRef.current?.focus();
      }
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);
  return (
    <>
      <header className="site-header">
        <Link
          href="/"
          aria-label="Alexx Eon home"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/full-logo-white.png"
            width={314}
            height={48}
            alt="Alexx Eon"
            unoptimized
          />
        </Link>
        <button
          ref={menuToggleRef}
          type="button"
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
          aria-hidden={isPortraitMobile ? !open : undefined}
          inert={isPortraitMobile && !open}
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
          <ThemeControl />
        </nav>
      </header>
      <div className="site-header-spacer" aria-hidden="true" />
    </>
  );
}
