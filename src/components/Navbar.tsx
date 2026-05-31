"use client";

import { useState } from "react";
import Image from "next/image";
import { navLinks, navScrollProgress } from "@/data/site-data";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (key: string) => {
    // Calculate actual scroll position from page's total scrollable height
    // Works on any device: desktop (14000px), mobile (7000px), or any size
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = navScrollProgress[key] ?? 0;
    const targetScroll = progress * maxScroll;
    
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/60 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 md:py-3">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            <Image
              src="/logo.png"
              alt="SoChillMedia"
              width={120}
              height={120}
              className="rounded-lg w-16 h-16 md:w-[120px] md:h-[120px]"
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => scrollTo(link.key)}
                className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="px-5 py-2.5 bg-accent hover:bg-accent-dark text-white text-sm font-medium rounded-full transition-all duration-200 hover:scale-105"
            >
              Let&apos;s Work Together
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-6 pt-2 border-t border-white/5">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.key}
                  onClick={() => scrollTo(link.key)}
                  className="text-base text-zinc-400 hover:text-white transition-colors px-2 py-2 text-left"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("contact")}
                className="mt-2 px-5 py-3 bg-accent text-white text-sm font-medium rounded-full text-center"
              >
                Let&apos;s Work Together
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
