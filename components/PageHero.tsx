import Link from "next/link";

export default function PageHero({ title, crumbs = [] }: { title: string; crumbs?: string[] }) {
  // crumbs from data look like ["Home", "About Us"]; only "Home" gets a link
  const trail = crumbs.length ? crumbs : ["Home", title];
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-maroon via-maroon-deep to-night py-16 text-white sm:py-24">
      <div aria-hidden className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-saffron/20 blur-3xl" />
      <div aria-hidden className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-red/30 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
        <h1 className="animate-fade-up text-3xl font-extrabold sm:text-5xl">{title}</h1>
        <nav aria-label="Breadcrumb" className="mt-4 animate-fade-up [animation-delay:.15s]">
          <ol className="flex flex-wrap items-center justify-center gap-2 text-sm text-white/80">
            {trail.map((c, i) => (
              <li key={i} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden className="text-saffron">›</span>}
                {i === 0 && c === "Home" ? <Link href="/" className="hover:text-saffron">Home</Link>
                  : <span aria-current={i === trail.length - 1 ? "page" : undefined} className={i === trail.length - 1 ? "text-saffron" : ""}>{c}</span>}
              </li>
            ))}
          </ol>
        </nav>
      </div>
      <div className="flag-bar absolute inset-x-0 bottom-0 h-1.5" aria-hidden />
    </section>
  );
}
