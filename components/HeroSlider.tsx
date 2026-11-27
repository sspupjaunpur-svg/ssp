"use client";
import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";

const SLIDES = ["/uploads/sliders/slider1.jpg", "/uploads/sliders/slider2.jpg", "/uploads/sliders/slider3.jpg"];

export default function HeroSlider({ children }: { children: ReactNode }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative flex min-h-[88svh] items-center overflow-hidden bg-night text-white">
      {SLIDES.map((src, n) => (
        <div key={src} aria-hidden className={`absolute inset-0 transition-opacity duration-1000 ${n === i ? "opacity-100" : "opacity-0"}`}>
          <Image src={src} alt="" fill priority={n === 0} sizes="100vw" className={`object-cover ${n === i ? "animate-ken-burns" : ""}`} />
        </div>
      ))}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-night/90 via-maroon-deep/70 to-transparent" />
      <div className="relative mx-auto w-full max-w-7xl px-4 py-24 sm:px-6">{children}</div>
      <div className="absolute inset-x-0 bottom-8 flex justify-center gap-3">
        {SLIDES.map((_, n) => (
          <button
            key={n}
            onClick={() => setI(n)}
            aria-label={`Show slide ${n + 1}`}
            aria-current={n === i}
            className={`h-2.5 rounded-full transition-all ${n === i ? "w-8 bg-saffron" : "w-2.5 bg-white/60 hover:bg-white"}`}
          />
        ))}
      </div>
      <div className="flag-bar absolute inset-x-0 bottom-0 h-1.5" aria-hidden />
    </section>
  );
}
