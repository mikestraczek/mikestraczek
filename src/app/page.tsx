"use client";

import { motion as m } from "framer-motion";

export default function Home() {
  return (
    <main className="h-screen p-4 font-[family-name:var(--font-geist-sans)]">
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[2rem] bg-slate-950 text-slate-50">
        <div
          className="animate-gradient morph-blob absolute top-1/2 left-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 opacity-30 blur-2xl"
          style={{
            background:
              "radial-gradient(circle, rgba(234,88,12,0.4) 0%, rgba(225,29,72,0.35) 50%, rgba(147,51,234,0.3) 100%)",
          }}
        />

        <m.h1
          className="glow:text-red-400 relative z-10 text-2xl font-black sm:text-4xl lg:text-5xl"
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: 0.7,
            scale: 1,
          }}
          transition={{ duration: 0.6 }}
        >
          Mike Straczek
        </m.h1>
      </div>
    </main>
  );
}
