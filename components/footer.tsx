import { getSiteInfo, getContactContent } from "@/lib/content";

export function Footer() {
  const siteInfo = getSiteInfo();
  const contactContent = getContactContent();

  return (
    <footer className="border-t border-orange-200 bg-orange-50/70 backdrop-blur dark:bg-orange-950/60">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-6 py-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} {siteInfo.name}. All rights reserved.</p>
        <div className="flex gap-4">
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
