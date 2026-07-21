import { getSiteInfo, getContactContent } from "@/lib/content";

export function Footer() {
  const siteInfo = getSiteInfo();
  const contactContent = getContactContent();
  const { email, linkedin, github } = contactContent.sidebar.links;

  const links = [
    { ...email, external: false },
    { ...linkedin, external: true },
    { ...github, external: true },
  ];

  return (
    <footer className="mt-16 border-t border-border">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:px-6 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {siteInfo.name}. All rights reserved.
        </p>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map((link) => (
            <a
              key={link.text}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="font-medium transition hover:text-accent-orange"
            >
              {link.text}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
