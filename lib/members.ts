export type Member = { id: string; name: string; father: string; mobile: string; state: string; from: string; to: string; photo: string };

// shortcut: no backend, demo record only; connect a real member API before launch
export const MEMBERS: Member[] = [
  { id: "UP2026Y0002", name: "Ramesh Kumar", father: "Suresh Kumar", mobile: "9876543210", state: "Uttar Pradesh",
    from: "2026", to: "2031", photo: "" }, // no photo: never put a real person's face on an invented record
];

/** Match by membership ID, name (partial) or mobile, ignoring case and spaces. */
export function findMembers(q: string, list = MEMBERS): Member[] {
  const s = q.trim().toLowerCase().replace(/\s+/g, " ");
  if (!s) return [];
  return list.filter((m) => m.id.toLowerCase() === s || m.mobile === s.replace(/\D/g, "").slice(-10) || m.name.toLowerCase().includes(s));
}

// self-check (runs in dev, or: node lib/members.ts)
if (process.env.NODE_ENV !== "production") {
  const ok = [["up2026y0002", 1], ["Ramesh  kumar", 1], ["+91 98765 43210", 1], ["ramesh", 1], ["nobody", 0], ["  ", 0], ["98765", 0]]
    .every(([q, n]) => findMembers(q as string).length === n);
  console.assert(ok, "findMembers self-check failed");
}
