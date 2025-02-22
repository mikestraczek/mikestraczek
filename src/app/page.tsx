"use client";

import { motion as m, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

import { ParticleBackground } from "@/components/ParticleBackground";

export default function Home() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 150 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 36);
      cursorY.set(e.clientY - 36);
    };

    window.addEventListener("mousemove", moveCursor);

    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  return (
    <main className="relative h-[100dvh] p-3 font-[family-name:var(--font-geist-sans)]">
      <m.div
        className="pointer-events-none fixed z-50 h-12 w-12 rounded-full border border-white/20"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-slate-950/90 text-slate-50">
        <ParticleBackground />

        <div
          className="morph-blob absolute inset-0 h-[90dvh] w-[90dvh] opacity-30 blur-2xl"
          style={{
            background:
              "radial-gradient(circle at center, rgba(234,88,12,0.4) 0%, rgba(225,29,72,0.35) 50%, rgba(147,51,234,0.3) 100%)",
          }}
        />

        <m.h1
          className="relative z-10 text-2xl font-black sm:text-4xl lg:text-5xl"
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

        <div className="absolute bottom-8 z-10 flex gap-6">
          <m.a
            href="https://github.com/mikestraczek"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 transition-colors duration-300 hover:text-slate-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            GitHub
          </m.a>

          <m.a
            href="https://www.linkedin.com/in/mike-straczek-26b842187/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 transition-colors duration-300 hover:text-slate-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            LinkedIn
          </m.a>
        </div>

        <m.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.5 }}
          className="absolute top-8 text-sm text-slate-400"
        >
          Frontend Developer
        </m.p>
      </div>
    </main>
  );
}
