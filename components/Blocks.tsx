import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Block } from "@/lib/content";

const LINKS: Record<string, string> = {
  "Join Now": "/join",
  "Join Us": "/join",
  "Contact Us": "/contact",
  "View Privacy Policy": "/privacyPolicy",
};
const SKIP = new Set(["input", "select", "option", "textarea", "label", "button", "iframe", "h1"]);
const isNum = (b?: Block) => b?.[0] === "text" && /^\d{1,2}$/.test(b[1]);
const isStat = (s: string) => /^[₹\d]/.test(s) || (s.length < 40 && s.includes("%"));

export function Btn({ href, children, light }: { href: string; children: ReactNode; light?: boolean }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl ${
        light ? "bg-saffron text-maroon-deep hover:bg-saffron-soft" : "bg-red text-white hover:bg-maroon"
      }`}
    >
      {children} <span aria-hidden>→</span>
    </Link>
  );
}

function Card({ img, body }: { img: Block; body: Block[] }) {
  const icon = img[1].includes("icon");
  return (
    <article className="group reveal flex flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl">
      {icon ? (
        <div className="px-6 pt-6">
          <Image src={img[1]} alt="" width={72} height={72} className="h-[72px] w-[72px] object-contain transition group-hover:scale-110" />
        </div>
      ) : (
        <div className="relative aspect-[4/3] overflow-hidden bg-cream">
          <Image src={img[1]} alt={img[2]} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-6">
        {body.map((b, i) =>
          b[0] === "p" ? <p key={i} className="text-muted leading-relaxed">{b[1]}</p>
          : i === 0 ? <h3 key={i} className="text-xl font-bold text-maroon">{b[1]}</h3>
          : <p key={i} className="mt-auto border-l-4 border-saffron bg-cream/60 px-4 py-2 font-semibold italic text-maroon">{b[1]}</p>,
        )}
      </div>
    </article>
  );
}

function Text({ s }: { s: string }) {
  if (LINKS[s]) return <div className="reveal"><Btn href={LINKS[s]}>{s}</Btn></div>;
  if (/^\d\d(-[A-Z])?$/.test(s))
    return <span className="reveal inline-block w-fit rounded-full bg-saffron px-3 py-1 text-xs font-black tracking-widest text-maroon-deep">{s}</span>;
  const con = s.match(/^\(([^)]+)\)\s*(.+)$/);
  if (con)
    return (
      <h3 className="reveal mt-8 flex flex-wrap items-baseline gap-3 text-2xl font-bold text-maroon">
        <span className="rounded-md bg-maroon px-2 py-0.5 text-sm text-saffron">{con[1]}</span>
        {con[2]}
      </h3>
    );
  if (s.length < 60 && s === s.toUpperCase() && /[A-Z]/.test(s))
    return <p className="reveal mt-6 text-sm font-bold tracking-[.2em] text-red">{s}</p>;
  if (s.length > 80)
    return <blockquote className="reveal rounded-2xl border-l-4 border-saffron bg-cream p-6 text-lg font-medium italic text-maroon">{s}</blockquote>;
  return <p className="reveal font-semibold text-ink">{s}</p>;
}

/** Generic renderer for scraped page blocks ([type, text, ...]). */
export default function Blocks({ blocks }: { blocks: Block[] }) {
  const out: ReactNode[] = [];
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    const [t, s] = b;
    if (SKIP.has(t) || !s) continue;

    if (t === "img") {
      const cards: ReactNode[] = [];
      let long = false;
      while (blocks[i]?.[0] === "img") {
        const img = blocks[i++];
        const body: Block[] = [];
        while (blocks[i] && ["h3", "h4", "text", "p"].includes(blocks[i][0]) && !(body.length && /^h/.test(blocks[i][0]))) {
          long ||= blocks[i][1].length > 300;
          body.push(blocks[i++]);
        }
        cards.push(<Card key={i} img={img} body={body} />);
      }
      i--;
      out.push(<div key={`g${i}`} className={`grid gap-6 sm:grid-cols-2 ${long ? "" : "lg:grid-cols-3"}`}>{cards}</div>);
    } else if (t === "li") {
      const items: string[] = [];
      while (blocks[i]?.[0] === "li") items.push(blocks[i++][1]);
      i--;
      out.push(
        <ul key={`l${i}`} className="reveal grid gap-3 sm:grid-cols-2">
          {items.map((x, j) => (
            <li key={j} className="flex gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5">
              <span aria-hidden className="mt-1 h-3 w-3 shrink-0 rotate-45 bg-saffron" />
              <span className="text-ink">{x}</span>
            </li>
          ))}
        </ul>,
      );
    } else if (isNum(b) && /^h[34]$/.test(blocks[i + 1]?.[0] ?? "")) {
      const tiles: ReactNode[] = [];
      while (isNum(blocks[i]) && /^h[34]$/.test(blocks[i + 1]?.[0] ?? "")) {
        const [n, h] = [blocks[i][1], blocks[i + 1][1]];
        const p = blocks[i + 2]?.[0] === "p" ? blocks[i + 2][1] : "";
        i += p ? 3 : 2;
        tiles.push(
          <div key={i} className="reveal rounded-2xl bg-gradient-to-br from-maroon to-maroon-deep p-6 text-white shadow-lg">
            <span className="text-4xl font-black text-saffron">{n}</span>
            <h4 className="mt-2 text-lg font-bold">{h}</h4>
            {p && <p className="mt-2 text-sm text-white/80">{p}</p>}
          </div>,
        );
      }
      i--;
      out.push(<div key={`t${i}`} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{tiles}</div>);
    } else if (t === "text") {
      out.push(<Text key={i} s={s} />);
    } else if (t === "h2") {
      out.push(
        isStat(s) ? (
          <p key={i} className="reveal text-gradient text-4xl font-black sm:text-6xl">{s}</p>
        ) : (
          <h2 key={i} className="reveal mt-10 text-3xl font-extrabold text-maroon-deep sm:text-4xl">{s}</h2>
        ),
      );
    } else if (t === "h3") {
      out.push(
        /^["“]/.test(s) ? (
          <blockquote key={i} className="reveal border-l-4 border-red pl-5 text-xl font-semibold italic text-maroon">{s}</blockquote>
        ) : (
          <h3 key={i} className="reveal mt-6 text-2xl font-bold text-maroon">{s}</h3>
        ),
      );
    } else if (t === "h4") {
      out.push(<h4 key={i} className="reveal mt-4 text-lg font-bold text-red">{s}</h4>);
    } else {
      out.push(<p key={i} className="reveal leading-relaxed text-muted">{s}</p>);
    }
  }
  return <div className="flex flex-col gap-5">{out}</div>;
}

/** Standard inner page: hero + centred content column. */
export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 ${className}`}>{children}</section>;
}
