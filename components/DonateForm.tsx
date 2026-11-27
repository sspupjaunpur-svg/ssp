"use client";
import { useState } from "react";
import { Field } from "./Fields";
import FormShell from "./FormShell";

export default function DonateForm() {
  const [amount, setAmount] = useState("");
  const n = Number(amount);
  return (
    <FormShell name="donation" submitLabel={`Donate ₹${n > 0 ? n.toLocaleString("en-IN") : 0}`}>
      <Field label="Full Name" name="name" placeholder="Your full name" required autoComplete="name" />
      <Field label="Email" name="email" type="email" placeholder="you@example.com" required autoComplete="email" />
      <Field label="Amount (₹)" name="amount" type="number" min={1} step={1} inputMode="numeric" placeholder="e.g. 501" required value={amount} onChange={(e) => setAmount(e.target.value)} />
      <Field label="📸 Click or Tap to Upload Screenshot" name="payment_screenshot" type="file" accept="image/jpeg,image/png,image/webp" required />
      <p className="text-sm text-muted">Your details are used to record this contribution and its payment confirmation.</p>
    </FormShell>
  );
}
