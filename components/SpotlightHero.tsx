import React from "react";
import { cn } from "@/utils/cn";
import { Spotlight } from "@/components/ui/spotlight";

import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Link from "next/link";

const words = `Mandalas are made up of concentric rings that grow outward, representing harmony and wholeness with the world and intellect. Coloring mandalas can help you relax, quiet your nervous system, invoke positive energy, and balance your body's energies.`;

export function SpotlightHero() {
  return (
    <div className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          <TextGenerateEffect words={words} />
        </h1>
        // Button code
        <div className="flex justify-center mt-8">
          <Link
            href="/magic"
            className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 fadeIn"
          >
            Let's create a Mandala
          </Link>
        </div>
      </div>
    </div>
  );
}
