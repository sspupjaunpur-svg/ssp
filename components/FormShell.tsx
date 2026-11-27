"use client";
import { useState, type FormEvent, type ReactNode } from "react";

type Status = "idle" | "sending" | "ok" | "err" | "demo";
const MSG: Record<Exclude<Status, "idle" | "sending">, string> = {
  ok: "Thank you! Your details were submitted successfully.",
  err: "Sorry, something went wrong. Please try again in a moment.",
  demo: "Demo mode: this form isn't connected to a server yet, so nothing was sent.",
};

/** Posts the form as multipart FormData to NEXT_PUBLIC_FORM_ENDPOINT. */
export default function FormShell({ name, children, submitLabel, className = "" }: { name: string; children: ReactNode; submitLabel: string; className?: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get("website")) return; // honeypot filled = bot
    const url = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
    if (!url) return setStatus("demo");
    data.append("form", name);
    setStatus("sending");
    try {
      const res = await fetch(url, { method: "POST", body: data });
      setStatus(res.ok ? "ok" : "err");
      if (res.ok) (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("err");
    }
  }

  return (
    <form onSubmit={submit} className={`flex flex-col gap-6 ${className}`}>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      {children}
      <button
        type="submit"
        disabled={status === "sending"}
        className="self-start rounded-full bg-red px-8 py-3.5 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-maroon disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : submitLabel}
      </button>
      <p role="status" aria-live="polite" className={status === "idle" || status === "sending" ? "sr-only" : `rounded-xl p-4 text-sm font-semibold ${status === "ok" ? "bg-green-50 text-green-800" : status === "demo" ? "bg-saffron/20 text-maroon-deep" : "bg-red/10 text-red"}`}>
        {status in MSG ? MSG[status as keyof typeof MSG] : ""}
      </p>
    </form>
  );
}
