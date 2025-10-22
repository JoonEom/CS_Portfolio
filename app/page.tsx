import { Hero } from "@/components/hero";

export default function Home() {
  const highlightCards = [
    {
      title: "Current Focus",
      body: "Designing adaptive full stack experiences and drafting AI-assisted product ideas that bridge research with real-world impact.",
    },
    {
      title: "Latest Experiment",
      body: "Building a filler prototype that pairs large language models with event-driven architectures to keep insights flowing in real time.",
    },
    {
      title: "Collaboration Wishlist",
      body: "Open to partnering on thoughtful, human-centered tooling in AI, data visualization, and resilient platform engineering.",
    },
  ];

  return (
    <div className="space-y-16">
      <Hero />

      <section className="grid gap-6 md:grid-cols-3">
        {highlightCards.map((card) => (
          <article
            key={card.title}
            className="rounded-2xl border border-border bg-white/70 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-md dark:bg-slate-950/60"
          >
            <h2 className="text-lg font-semibold text-foreground">
              {card.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {card.body}
            </p>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-dashed border-accent-teal/60 bg-accent-teal/5 p-8 text-center shadow-inner dark:border-accent-indigo/60 dark:bg-accent-indigo/10">
        <h2 className="text-2xl font-semibold text-foreground">
          Want early updates?
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Drop a note and I&apos;ll share launch details once this portfolio
          moves beyond the filler stage.
        </p>
        <form className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full max-w-xs rounded-full border border-border bg-white/80 px-5 py-3 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-accent-indigo dark:bg-slate-950/70"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-accent-teal px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-accent-teal/80"
          >
            Join the list
          </button>
        </form>
      </section>
    </div>
  );
}
