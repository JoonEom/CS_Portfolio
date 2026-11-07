type PageHeaderProps = {
  title: string;
  description: string;
};

/**
 * Page titles are set in the display voice at poster scale. The heading
 * carries its own weight: no label above it, no entrance effect.
 */
export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="shell pb-10 pt-12 sm:pb-14 sm:pt-20">
      <h1 className="display text-[clamp(3.25rem,10vw,7.5rem)] leading-[0.82]">
        {title}
      </h1>
      <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
        {description}
      </p>
    </header>
  );
}
