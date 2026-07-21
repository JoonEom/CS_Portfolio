import type { ReactNode } from "react";

type PageHeaderProps = {
  badge: string;
  title: string;
  description: string;
  icon?: ReactNode;
};

export function PageHeader({
  badge,
  title,
  description,
  icon,
}: PageHeaderProps) {
  return (
    <header className="max-w-2xl">
      <span className="eyebrow">
        {icon}
        {badge}
      </span>
      <h1 className="mt-5 text-balance text-3xl font-semibold tracking-tightest text-foreground sm:text-4xl md:text-[2.75rem]">
        {title}
      </h1>
      <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground">
        {description}
      </p>
    </header>
  );
}
