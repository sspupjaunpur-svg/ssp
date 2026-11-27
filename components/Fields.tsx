import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

export const inputCls =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-ink outline-none transition placeholder:text-muted/60 focus:border-saffron focus:ring-4 focus:ring-saffron/30 file:mr-4 file:rounded-full file:border-0 file:bg-saffron file:px-4 file:py-2 file:text-sm file:font-bold file:text-maroon-deep";

function Label({ label, required, children, className = "" }: { label: string; required?: boolean; children: ReactNode; className?: string }) {
  return (
    <label className={`flex flex-col gap-2 text-sm font-semibold text-maroon-deep ${className}`}>
      <span>
        {label} {required && <span className="text-red" aria-hidden>*</span>}
      </span>
      {children}
    </label>
  );
}

type Base = { label: string; className?: string };

export function Field({ label, className, ...p }: Base & InputHTMLAttributes<HTMLInputElement>) {
  return <Label label={label} required={p.required} className={className}><input className={inputCls} {...p} /></Label>;
}

export function Area({ label, className, ...p }: Base & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <Label label={label} required={p.required} className={className}><textarea rows={5} className={inputCls} {...p} /></Label>;
}

export function Choice({ label, className, options, ...p }: Base & { options: string[] } & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <Label label={label} required={p.required} className={className}>
      <select className={inputCls} defaultValue="" {...p}>
        <option value="" disabled>Select {label.replace(/\s*\(.*\)/, "")}</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </Label>
  );
}
