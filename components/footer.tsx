export function Footer() {
  return (
    <footer className="border-t border-border bg-white/70 backdrop-blur dark:bg-slate-950/60">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-6 py-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Minjoon Eom. All rights reserved.</p>
        <div className="flex gap-4">
          <a
            href="mailto:minjoon@example.com"
            className="transition hover:text-accent-teal"
          >
            Email
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-accent-indigo"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/JoonEom"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-accent-lavender"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
