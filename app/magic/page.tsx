"use client";

import { LampHero } from "@/components/LampHero";
import { MandalasCards } from "@/components/MandalasCards";

export default function Magic() {
  return (
    <section className="flex flex-col bg-slate-950 ">
      <LampHero />
      <div className="-mt-[18rem]">
        <MandalasCards />
      </div>
    </section>
  );
}
