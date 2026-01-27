"use client";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#fcfaf7]">
      <header className="w-full px-8 md:px-16 py-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl text-[#2c2e2a]/80">
              edit_note
            </span>
            <span className="text-lg font-medium tracking-tight text-black">Write</span>
          </div>
          <nav>
            <Link href="/login">
              <span className="text-sm font-medium transition-colors text-black">Login</span>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center px-6">
        <div className="w-full max-w-2xl text-center space-y-10 pt-20 md:pt-32 pb-24">
          <div className="space-y-4">
            <h1 className="font-serif text-7xl md:text-9xl font-light tracking-tight text-black">
              Write.
            </h1>
            <p className="text-lg md:text-xl text-[#6b7280] font-light tracking-wide">
              A quiet place to think.
            </p>
          </div>
          <Link href="/login">
            <button className="bg-[#8fa382] text-white px-10 py-4 rounded-full text-base font-medium shadow-sm hover:brightness-95 transition-all duration-300">
            Start writing
          </button>
          </Link>

        </div>

        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 py-16 border-t border-black/5">
          {[
            ["visibility_off", "Focus Mode", "Writing without distractions."],
            ["cloud_sync", "Cloud Sync", "Access your notes anywhere."],
            ["terminal", "Markdown Support", "Simple formatting for thinkers."],
          ].map(([icon, title, text]) => (
            <div
              key={title}
              className="flex flex-col items-center md:items-start text-center md:text-left space-y-3 text-black"
            >
              <span className="material-symbols-outlined text-[#8fa382] text-3xl">
                {icon}
              </span>
              <h3 className="text-sm font-medium uppercase tracking-widest">
                {title}
              </h3>
              <p className="text-sm text-[#6b7280] font-light leading-relaxed">
                {text}
              </p>
            </div>
          ))}
        </div>
      </main>

      <footer className="w-full px-8 py-10 mt-auto">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] text-black">
            © 2026 Write. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
    
  );
}
