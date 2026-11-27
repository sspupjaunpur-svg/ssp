"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/nav";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow ${scrolled ? "shadow-lg" : ""}`}>
      <div className="flag-bar h-1.5" aria-hidden />
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Sarvjan Sanatan Party – Home">
          <Image src="/images/logo.webp" alt="Sarvjan Sanatan Party flag" width={96} height={64} priority
            className={`h-auto transition-all ${scrolled ? "w-16" : "w-20"}`} />
          <span className="hidden leading-tight sm:block">
            <span className="block text-lg font-extrabold tracking-wide text-maroon">SARVJAN SANATAN</span>
            <span className="block text-xs font-bold tracking-[0.3em] text-red">PARTY</span>
          </span>
        </Link>

        <nav className="hidden xl:block" aria-label="Main">
          <ul className="flex items-center gap-1 text-[15px] font-semibold text-ink">
            {NAV.map((item) => (
              <li key={item.label} className="group relative">
                <Link href={item.href} className="flex items-center gap-1 rounded-md px-3 py-2 transition-colors hover:text-red">
                  {item.label}
                  {item.children && <span aria-hidden className="text-xs transition-transform group-hover:rotate-180">▾</span>}
                </Link>
                <span className="absolute inset-x-3 bottom-0.5 h-0.5 origin-left scale-x-0 bg-red transition-transform group-hover:scale-x-100" />
                {item.children && (
                  <ul className="invisible absolute left-0 top-full w-72 translate-y-2 rounded-xl border-t-4 border-saffron bg-white p-2 opacity-0 shadow-2xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    {item.children.map((c) => (
                      <li key={c.label}>
                        <Link href={c.href} className="block rounded-lg px-4 py-2.5 text-sm transition-colors hover:bg-cream hover:pl-5 hover:text-maroon">
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <Link href="/join" className="rounded-full bg-saffron px-5 py-2.5 text-sm font-bold text-ink shadow transition hover:-translate-y-0.5 hover:shadow-lg">Join Now</Link>
          <Link href="/donate" className="rounded-full bg-red px-5 py-2.5 text-sm font-bold text-white shadow transition hover:-translate-y-0.5 hover:bg-maroon hover:shadow-lg">Make A Donation</Link>
        </div>

        <button type="button" onClick={() => setOpen(true)} className="rounded-lg p-2 text-maroon xl:hidden" aria-label="Open menu" aria-expanded={open}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </div>

      {/* mobile / tablet drawer */}
      <div className={`fixed inset-0 z-50 overflow-hidden xl:hidden ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
        <div onClick={close} className={`absolute inset-0 bg-night/60 transition-opacity ${open ? "opacity-100" : "opacity-0"}`} />
        <aside className={`absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flag-bar h-1.5" />
          <div className="flex items-center justify-between p-4">
            <Image src="/images/logo.webp" alt="" width={72} height={48} className="h-auto w-16" />
            <button type="button" onClick={close} className="rounded-lg p-2 text-maroon" aria-label="Close menu">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </div>
          <ul className="flex-1 px-4 font-semibold">
            {NAV.map((item) => (
              <li key={item.label} className="border-b border-cream">
                {item.children ? (
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between py-3.5">
                      {item.label}<span aria-hidden className="transition-transform group-open:rotate-180">▾</span>
                    </summary>
                    <ul className="mb-3 border-l-2 border-saffron pl-4 text-sm font-medium">
                      {item.children.map((c) => (
                        <li key={c.label}><Link href={c.href} onClick={close} className="block py-2 hover:text-red">{c.label}</Link></li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <Link href={item.href} onClick={close} className="block py-3.5 hover:text-red">{item.label}</Link>
                )}
              </li>
            ))}
          </ul>
          <div className="grid gap-3 p-4">
            <Link href="/join" onClick={close} className="rounded-full bg-saffron py-3 text-center font-bold">Join Now</Link>
            <Link href="/donate" onClick={close} className="rounded-full bg-red py-3 text-center font-bold text-white">Make A Donation</Link>
          </div>
        </aside>
      </div>
    </header>
  );
}
