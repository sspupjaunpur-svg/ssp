"use client";
import { useEffect, useSyncExternalStore } from "react";

// Every Indian language Google Translate supports (checked 2026-11; Bodo & Kashmiri not available). Hindi is the site default.
const LANGS: [string, string][] = [
  ["hi", "हिन्दी"], ["en", "English"], ["bn", "বাংলা"], ["mr", "मराठी"], ["te", "తెలుగు"],
  ["ta", "தமிழ்"], ["gu", "ગુજરાતી"], ["ur", "اردو"], ["kn", "ಕನ್ನಡ"], ["or", "ଓଡ଼ିଆ"],
  ["ml", "മലയാളം"], ["pa", "ਪੰਜਾਬੀ"], ["as", "অসমীয়া"], ["mai", "मैथिली"], ["bho", "भोजपुरी"],
  ["awa", "अवधी"], ["mwr", "मारवाड़ी"], ["sa", "संस्कृतम्"], ["ne", "नेपाली"], ["sd", "سنڌي"],
  ["doi", "डोगरी"], ["gom", "कोंकणी"], ["sat", "ᱥᱟᱱᱛᱟᱲᱤ"], ["mni-Mtei", "ꯃꯤꯇꯩꯂꯣꯟ"], ["lus", "Mizo"],
  ["kha", "Khasi"], ["trp", "Kokborok"], ["tcy", "ತುಳು"],
];

const readLang = () => document.cookie.match(/googtrans=\/en\/([^;]+)/)?.[1];

function setLang(code: string) {
  const v = `googtrans=/en/${code};path=/`;
  document.cookie = v;
  document.cookie = `${v};domain=.${location.hostname.replace(/^www\./, "")}`; // GT also reads the domain-wide cookie
}

declare global {
  interface Window { google?: any; gtInit?: () => void } // eslint-disable-line @typescript-eslint/no-explicit-any
}

function loadTranslate() {
  if (document.getElementById("gt-script")) return;
  if (!readLang()) setLang("hi");

  // Google Translate wraps text nodes in <font>; stop React crashing when it later removes/moves those nodes.
  const rm = Node.prototype.removeChild;
  Node.prototype.removeChild = function <T extends Node>(this: Node, c: T) { return c.parentNode === this ? (rm.call(this, c) as T) : c; };
  const ins = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function <T extends Node>(this: Node, n: T, ref: Node | null) {
    return ref && ref.parentNode !== this ? n : (ins.call(this, n, ref) as T);
  };

  const el = document.createElement("div");
  el.id = "gt-el";
  el.hidden = true;
  document.body.appendChild(el);
  window.gtInit = () => new window.google.translate.TranslateElement({ pageLanguage: "en", autoDisplay: false }, "gt-el");
  const s = document.createElement("script");
  s.id = "gt-script";
  s.src = "https://translate.google.com/translate_a/element.js?cb=gtInit";
  document.body.appendChild(s);
}

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  // cookie only changes via reload, so no subscription needed
  const lang = useSyncExternalStore(() => () => {}, () => readLang() ?? "hi", () => "hi");
  useEffect(loadTranslate, []);

  return (
    <select
      aria-label="Language / भाषा"
      value={lang}
      onChange={(e) => { setLang(e.target.value); location.reload(); }}
      className={`notranslate rounded-full border-2 border-saffron bg-white px-3 py-2 text-sm font-semibold text-maroon ${className}`}
    >
      {LANGS.map(([code, name]) => <option key={code} value={code}>{name}</option>)}
    </select>
  );
}
