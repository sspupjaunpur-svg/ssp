import Image from "next/image";
import Link from "next/link";

const COLS: [string, [string, string][]][] = [
  ["Quick Links", [["Home", "/"], ["Our Vision", "/vision"], ["Organizational Structure", "/organization"], ["Bharat Rebuilding Plan", "/rebuildingPlan"], ["Contact Us", "/contact"]]],
  ["About Us", [["Our Role Models", "/roleModels"], ["Our Leadership", "/leadership"], ["Party Wings", "/partyWings"], ["Party Constitution", "/constitution"], ["Media", "/media"]]],
  ["Get Involved", [["Eligibility", "/eligibility"], ["Become a Member", "/join"], ["Internship / Volunteer", "/join"], ["Download Membership Card", "/membershipCard"], ["Make a Donation", "/donate"]]],
];

// shortcut: social links are "#" like the original site; swap in real profile URLs when the party provides them
const SOCIAL = [
  ["Facebook", "M14 9h3V5h-3c-2.8 0-4 1.7-4 4v2H7v4h3v9h4v-9h3l1-4h-4V9.5c0-.3.2-.5.5-.5z"],
  ["X", "M4 4l7.2 9.6L4.3 20H6l5.9-5.4L16 20h4l-7.5-10L19 4h-1.7l-5.5 5L8 4z"],
  ["Instagram", "M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zm5 5a4 4 0 100 8 4 4 0 000-8zm5.5-1.5a1 1 0 100 2 1 1 0 000-2z"],
  ["YouTube", "M22 8.2a3 3 0 00-2-2C18.2 5.7 12 5.7 12 5.7s-6.2 0-8 .5a3 3 0 00-2 2A31 31 0 001.5 12a31 31 0 00.5 3.8 3 3 0 002 2c1.8.5 8 .5 8 .5s6.2 0 8-.5a3 3 0 002-2 31 31 0 00.5-3.8 31 31 0 00-.5-3.8zM10 15V9l5.2 3z"],
];

export default function Footer() {
  return (
    <footer className="relative bg-night text-white/80">
      <div className="flag-bar h-2" aria-hidden />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Image src="/images/logo.webp" alt="Sarvjan Sanatan Party flag" width={150} height={100} className="h-auto w-32 animate-flag-wave" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed">Modern India. Rooted in its Civilisation. A new political alternative for every Indian.</p>
          <ul className="mt-5 flex gap-3">
            {SOCIAL.map(([name, d]) => (
              <li key={name}>
                <a href="#" aria-label={name} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:-translate-y-1 hover:bg-saffron hover:text-ink">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d={d} /></svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
        {COLS.map(([title, links]) => (
          <div key={title}>
            <h2 className="mb-4 text-lg font-bold text-saffron">{title}</h2>
            <ul className="space-y-2.5 text-sm">
              {links.map(([l, h]) => (
                <li key={l}><Link href={h} className="inline-block transition hover:translate-x-1 hover:text-saffron">› {l}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-center text-sm sm:flex-row sm:px-6">
          <p>© 2026 Sarvjan Sanatan Party (SSP). All Rights Reserved.</p>
          <p className="flex items-center gap-3">
            <Link href="/privacyPolicy" className="hover:text-saffron">Privacy Policy</Link>|
            <Link href="/terms" className="hover:text-saffron">Terms of Use</Link>
            <Link href="/join" className="ml-2 rounded-full bg-saffron px-4 py-1.5 font-bold text-ink hover:bg-saffron-soft">Join Now</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
