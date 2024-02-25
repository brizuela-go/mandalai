import { HoverEffect } from "@/components/ui/card-hover-effect";

export function MandalasCards() {
  return (
    <div className="max-w-5xl mx-auto px-8 ">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "Rainbow",
    description:
      "This mandala is inspired by a rainbow, a natural phenomenon that occurs after a storm.",
    image: "/rainbow.svg",
    link: "mandala/rainbow",
  },
];
