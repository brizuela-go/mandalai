"use client";
import React from "react";
import { WavyBackground } from "@/components/ui/wavy-background";
import Link from "next/link";

export function WavyBackgroundDemo() {
  return (
    <WavyBackground>
      <p className="text-4xl lg:text-7xl text-white font-bold inter-var text-center tracking-tight bg-gradient-to-r bg-clip-text text-transparent from-slate-50 to-slate-300">
        MandalAi
      </p>
      <p className="text-lg mt-4 font-normal inter-var text-center tracking-tight text-slate-300">
        Get ready to relax
      </p>
      <div className="flex justify-center mt-8">
        <Link
          href="/introduction"
          className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            Begin
          </span>
        </Link>
      </div>
    </WavyBackground>
  );
}
