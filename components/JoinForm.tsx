"use client";
import Image from "next/image";
import { useState, type ReactNode } from "react";
import { Choice, Field } from "./Fields";
import FormShell from "./FormShell";

const PLANS = [
  { code: "S", name: "Sadharan (साधारण)", fee: 21, text: "General members can vote but cannot contest elections or hold office." },
  { code: "K", name: "Karmath (कर्मठ)", fee: 108, text: "Can contest party elections and hold office up to the Assembly level." },
  { code: "V", name: "Vishisht (विशिष्ट)", fee: 1008, text: "Can hold office up to Union/Mandal level and contest elections from Ward to Assembly." },
  { code: "Y", name: "Yogeshwar (योगेश्वर)", fee: 21600, text: "Can contest national-level elections and become a member of the national organization." },
];
const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

function Step({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <fieldset className="rounded-3xl bg-white p-5 shadow-md ring-1 ring-black/5 sm:p-8">
      <legend className="flex items-center gap-3 px-1 text-xl font-bold text-maroon">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-saffron text-sm font-black text-maroon-deep">{n}</span>
        {title}
      </legend>
      <div className="mt-4 grid gap-5 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

export default function JoinForm({ states, docs, terms, note }: { states: string[]; docs: string[]; terms: string[]; note: string }) {
  const [plan, setPlan] = useState<(typeof PLANS)[number] | null>(null);
  const tel = { pattern: "[6-9][0-9]{9}", title: "10-digit Indian mobile number", inputMode: "numeric" as const, maxLength: 10 };

  return (
    <FormShell name="membership" submitLabel="Submit">
      <input type="hidden" name="role" value="member" />
      <div>
        <h2 className="text-2xl font-extrabold text-maroon-deep">Select Membership Type <span className="font-deva">( सदस्यता प्रकार चुनें )</span> <span className="text-red">*</span></h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((p) => (
            <label key={p.code} className="group relative flex cursor-pointer flex-col gap-2 rounded-2xl bg-white p-5 shadow-md ring-2 ring-transparent transition hover:-translate-y-1 has-[:checked]:bg-cream has-[:checked]:ring-saffron">
              <input type="radio" name="membership_type" value={p.code} required onChange={() => setPlan(p)} className="sr-only" />
              <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-red to-maroon text-xl font-black text-saffron">{p.code}</span>
              <span className="text-lg font-bold text-maroon">{p.name}</span>
              <span className="text-sm text-muted">{p.text}</span>
              <span className="mt-auto text-2xl font-black text-red">{inr(p.fee)}</span>
              <span aria-hidden className="absolute right-4 top-4 hidden h-6 w-6 place-items-center rounded-full bg-saffron text-sm font-black text-maroon-deep group-has-[:checked]:grid">✓</span>
            </label>
          ))}
        </div>
      </div>

      <p className="text-sm text-muted">All fields ( <span className="text-red">*</span> ) are required</p>

      <Step n="01" title="Applicant details">
        <Field label="Full Name ( पूरा नाम )" name="name" placeholder="Your Full Name" required autoComplete="name" />
        <fieldset className="flex flex-col gap-2 text-sm font-semibold text-maroon-deep">
          <legend>Gender / Sex ( लिंग ) <span className="text-red">*</span></legend>
          <div className="flex flex-wrap gap-3 pt-2">
            {["Male", "Female", "Others"].map((g) => (
              <label key={g} className="flex cursor-pointer items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2.5 has-[:checked]:border-saffron has-[:checked]:bg-saffron/20">
                <input type="radio" name="gender" value={g} required className="accent-red" /> {g}
              </label>
            ))}
          </div>
        </fieldset>
        <Field label="Father's/Husband's Name ( पिता / पति का नाम )" name="father_name" placeholder="Father or Husband's Name" required />
        <Choice label="State / राज्य" name="state" options={states} required />
        <Field label="Mobile Number" name="mobile" type="tel" placeholder="10-digit mobile number" required autoComplete="tel-national" {...tel} />
        <Field label="Email ID (Optional)" name="email" type="email" placeholder="Your Email ID" autoComplete="email" />
        <Field label="Upload your photo" name="photo" type="file" accept="image/jpeg,image/png,image/webp" required className="sm:col-span-2" />
      </Step>

      <Step n="02" title="Identity Document (Compulsory)">
        <p className="font-deva rounded-xl bg-saffron/15 p-4 text-sm text-maroon-deep sm:col-span-2">{note}</p>
        <Choice label="Document Type" name="doc_type" options={docs} required />
        <Field label="Document Number" name="doc_number" placeholder="Enter document number" required />
        <Field label="1. Front Side Photo ( सामने का फोटो )" name="doc_front" type="file" accept="image/jpeg,image/png,image/webp,application/pdf" required />
        <Field label="2. Back Side Photo ( पीछे का फोटो )" name="doc_back" type="file" accept="image/jpeg,image/png,image/webp,application/pdf" required />
      </Step>

      <Step n="03" title="Membership Fee & Payment Screenshot ( स्क्रीनशॉट )">
        <div className="flex flex-col justify-center gap-3 rounded-2xl bg-gradient-to-br from-maroon to-maroon-deep p-6 text-white">
          <span className="font-deva text-sm text-white/80">चयनित सदस्यता प्रकार (Selected Plan):</span>
          <span className="text-xl font-bold text-saffron">{plan ? `${plan.code} – ${plan.name}` : "Select a plan above"}</span>
          <span className="font-deva text-sm text-white/80">देय शुल्क:</span>
          <span className="text-4xl font-black text-saffron" aria-live="polite">{inr(plan?.fee ?? 0)}</span>
        </div>
        <div className="flex flex-col items-center gap-2 rounded-2xl bg-cream p-6 text-center">
          <span className="font-bold text-maroon">Scan to Pay Fee</span>
          <Image src="/images/qr.webp" alt="Party Payment QR" width={200} height={200} className="rounded-xl bg-white p-2 shadow" />
          <span className="text-sm text-muted">Any UPI (GPay, PhonePe, Paytm)</span>
        </div>
        <Field label="Upload Payment Screenshot ( भुगतान रसीद )" name="payment_screenshot" type="file" accept="image/jpeg,image/png,image/webp" required className="sm:col-span-2" />
      </Step>

      <Step n="04" title="Terms and Conditions (Declaration)">
        <ul className="flex flex-col gap-3 sm:col-span-2">
          {terms.map((t) => (
            <li key={t} className="flex gap-3 text-ink"><span aria-hidden className="mt-1.5 h-2.5 w-2.5 shrink-0 rotate-45 bg-red" />{t}</li>
          ))}
        </ul>
        <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-saffron/15 p-4 font-semibold text-maroon-deep sm:col-span-2">
          <input type="checkbox" name="terms" value="agreed" required className="mt-1 h-5 w-5 accent-red" />
          <span>I have read all the above terms and conditions and I agree with them. <span className="text-red">*</span></span>
        </label>
      </Step>
    </FormShell>
  );
}
