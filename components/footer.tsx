import { getSiteInfo, getContactContent } from "@/lib/content";

export function Footer() {
  const siteInfo = getSiteInfo();
  const contactContent = getContactContent();

  return (
    <footer className="border-t border-orange-200 bg-orange-50/70 backdrop-blur dark:bg-orange-950/60">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-4 text-xs text-muted-foreground sm:px-6 sm:py-6 sm:text-sm md:flex-row md:items-center md:justify-between md:gap-2">
        <p>© {new Date().getFullYear()} {siteInfo.name}. All rights reserved.</p>
        <div className="flex flex-wrap gap-3 sm:gap-4">
          <a
            href={contactContent.sidebar.links.email.href}
            className="transition hover:text-orange-600"
          >
            {contactContent.sidebar.links.email.text}
          </a>
          <a
            href={contactContent.sidebar.links.linkedin.href}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-orange-600"
          >
            {contactContent.sidebar.links.linkedin.text}
          </a>
          <a
            href={contactContent.sidebar.links.github.href}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-orange-600"
          >
            {contactContent.sidebar.links.github.text}
          </a>
        </div>
      </div>
    </footer>
  );
}
