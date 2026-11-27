"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { findMembers, type Member } from "@/lib/members";
import { inputCls } from "@/components/Fields";

const load = (src: string) =>
  new Promise<HTMLImageElement>((ok, fail) => {
    const im = new window.Image();
    im.onload = () => ok(im);
    im.onerror = fail;
    im.src = src;
  });

// Coordinates measured on /images/id_card_template.webp (1024x765).
async function drawCard(c: HTMLCanvasElement, m: Member) {
  const [tpl, photo] = await Promise.all([load("/images/id_card_template.webp"), m.photo ? load(m.photo) : null]);
  const g = c.getContext("2d")!;
  g.drawImage(tpl, 0, 0, 1024, 765);

  // photo: cover-crop into the frame, tall enough to hide the "paste photo here" caption
  if (photo) {
    const [bx, by, bw, bh] = [797, 415, 178, 235];
    const s = Math.max(bw / photo.width, bh / photo.height);
    const [sw, sh] = [bw / s, bh / s];
    g.drawImage(photo, (photo.width - sw) / 2, (photo.height - sh) / 2, sw, sh, bx, by, bw, bh);
  }

  const font = getComputedStyle(c).fontFamily;
  g.fillStyle = "#4a0f15";
  g.font = `bold 22px ${font}`;
  g.textAlign = "center";
  g.fillText(m.from, 507, 388);
  g.fillText(m.to, 657, 388);
  g.textAlign = "left";
  g.font = `bold 26px ${font}`;
  [[m.name, 422], [m.father, 488], [m.id, 550], [m.state, 605]].forEach(([t, y]) => g.fillText(t as string, 335, y as number, 385));

  // template prints the old .org domain; paint over it with the .in one
  const [r, gr, b] = g.getImageData(716, 712, 1, 1).data;
  g.fillStyle = `rgb(${r},${gr},${b})`;
  g.fillRect(720, 697, 284, 32);
  g.fillStyle = "#4a0f15";
  g.font = `bold 18px ${font}`;
  g.textAlign = "right";
  g.fillText("WWW.SARVJANSANATANPARTY.IN", 1000, 720);

  // shortcut: demo data only, so every card (and its download) is stamped SAMPLE; remove once a real member API is connected
  g.save();
  g.translate(512, 382);
  g.rotate(-0.4);
  g.fillStyle = "rgba(200,16,46,0.28)";
  g.font = `900 150px ${font}`;
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText("SAMPLE", 0, 0);
  g.restore();
}

type Props = { label: string; placeholder: string; notFound: [string, string] };

export default function MembershipSearch({ label, placeholder, notFound }: Props) {
  const [hits, setHits] = useState<Member[] | null>(null);
  const [copied, setCopied] = useState(false);
  const canvas = useRef<HTMLCanvasElement>(null);
  const m = hits?.[0];

  useEffect(() => {
    if (m && canvas.current) drawCard(canvas.current, m).catch(() => {});
  }, [m]);

  function search(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCopied(false);
    setHits(findMembers(String(new FormData(e.currentTarget).get("q") ?? "")));
  }

  function download() {
    canvas.current?.toBlob((b) => {
      if (!b || !m) return;
      const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(b), download: `${m.id}.png` });
      a.click();
      URL.revokeObjectURL(a.href);
    });
  }

  function print() {
    const w = window.open("");
    if (!w || !canvas.current) return;
    const img = w.document.createElement("img");
    img.src = canvas.current.toDataURL();
    img.style.width = "100%";
    img.onload = () => w.print();
    w.document.body.appendChild(img);
  }

  const btn = "rounded-full px-5 py-2.5 text-sm font-bold shadow transition hover:-translate-y-0.5";

  return (
    <div className="flex flex-col gap-8">
      <form onSubmit={search} className="reveal flex flex-col gap-3 rounded-2xl bg-white p-6 shadow-md ring-1 ring-black/5 sm:p-8">
        <label htmlFor="q" className="font-deva text-sm font-semibold text-maroon-deep">{label}</label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input id="q" name="q" required placeholder={placeholder} className={`${inputCls} font-deva`} />
          <button className={`${btn} bg-red px-8 font-deva text-white hover:bg-maroon`}>खोजें</button>
        </div>
      </form>

      <div aria-live="polite">
        {hits && !m && (
          <div className="rounded-2xl bg-cream p-8 text-center">
            <h3 className="font-deva text-2xl font-bold text-maroon">{notFound[0]}</h3>
            <p className="mt-2 text-muted">{notFound[1]}</p>
          </div>
        )}
        {m && (
          <div className="animate-fade-up flex flex-col gap-5 rounded-2xl bg-white p-4 shadow-md ring-1 ring-black/5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-deva font-semibold text-maroon-deep">{hits.length} सदस्य मिला — अपना कार्ड डाउनलोड करें</p>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900">Demo data, not a real membership record</span>
            </div>
            <canvas ref={canvas} width={1024} height={765} role="img" aria-label={`Membership card of ${m.name}, ${m.id}`}
              className="h-auto w-full rounded-xl font-noto shadow-lg" />
            <div className="flex flex-wrap gap-3 font-deva">
              <button onClick={download} className={`${btn} bg-red text-white hover:bg-maroon`}>डाउनलोड ID कार्ड (HD)</button>
              <button onClick={print} className={`${btn} bg-saffron text-maroon-deep hover:bg-saffron-soft`}>प्रिंट करें (Print)</button>
              <button
                onClick={() => window.open("https://wa.me/?text=" + encodeURIComponent(`My Sarvjan Sanatan Party membership: ${m.id} ${location.origin}/membershipCard`))}
                className={`${btn} bg-[#25d366] text-white`}>WhatsApp शेयर</button>
              <button onClick={() => navigator.clipboard.writeText(m.id).then(() => setCopied(true))}
                className={`${btn} bg-cream text-maroon-deep`}>{copied ? "Copied ✓" : "ID कॉपी"}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
