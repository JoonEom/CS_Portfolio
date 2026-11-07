"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { AlertCircle, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { getContactContent } from "@/lib/content";

type FormState = {
  name: string;
  email: string;
  message: string;
};

type ToastState = {
  message: string;
  type: "success" | "error";
};

const initialForm: FormState = {
  name: "",
  email: "",
  message: "",
};

// Fields are underlined, like lines on a court, and the line turns court
// orange on focus.
const fieldClasses =
  "w-full rounded-none border-0 border-b-2 border-foreground/50 bg-transparent px-0 py-3 text-xl font-medium text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-court focus-visible:outline-none";

const labelClasses = "block text-sm font-bold text-muted-foreground";

export default function ContactPage() {
  const contactContent = getContactContent();
  const [form, setForm] = useState<FormState>(initialForm);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [isPending, startTransition] = useTransition();

  const socialLinks = [
    { ...contactContent.sidebar.links.email, external: false },
    { ...contactContent.sidebar.links.linkedin, external: true },
    { ...contactContent.sidebar.links.github, external: true },
    { ...contactContent.sidebar.links.resume, external: true },
  ];

  useEffect(() => {
    if (!toast) return undefined;

    const timer = window.setTimeout(() => {
      setToast(null);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [toast]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    startTransition(async () => {
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        if (!response.ok) {
          const data = (await response.json()) as { error?: string };
          throw new Error(data.error ?? "Something went wrong.");
        }

        const data = (await response.json()) as { message: string };
        setToast({ message: data.message, type: "success" });
        setForm(initialForm);
      } catch (error) {
        setToast({
          message:
            error instanceof Error
              ? error.message
              : "Sorry, I could not send your message. Please try again.",
          type: "error",
        });
      }
    });
  };

  return (
    <>
      <PageHeader
        title={contactContent.pageTitle}
        description={contactContent.pageDescription}
      />

      <div className="shell grid gap-14 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-20">
        <form className="space-y-8" onSubmit={handleSubmit} noValidate>
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="space-y-1">
              <label htmlFor="name" className={labelClasses}>
                {contactContent.form.nameLabel}
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                autoComplete="name"
                className={fieldClasses}
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="email" className={labelClasses}>
                {contactContent.form.emailLabel}
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className={fieldClasses}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="message" className={labelClasses}>
              {contactContent.form.messageLabel}
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              className={`${fieldClasses} resize-y`}
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="btn btn-court w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {isPending
              ? contactContent.form.sendingText
              : contactContent.form.submitText}
          </button>

          {toast ? (
            <div
              className={`flex items-center gap-3 border-2 px-4 py-3 text-sm font-bold ${
                toast.type === "success"
                  ? "border-court bg-court text-ink"
                  : "border-red-600 text-red-700 dark:border-red-400 dark:text-red-300"
              }`}
              role="status"
              aria-live="polite"
            >
              {toast.type === "success" ? (
                <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
              ) : (
                <AlertCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
              )}
              <span>{toast.message}</span>
            </div>
          ) : null}
        </form>

        <aside>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            {contactContent.sidebar.title}
          </p>

          <ul className="mt-6 border-b border-border">
            {socialLinks.map((item) => (
              <li key={item.text} className="rule-draw row-wipe group">
                <Link
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="flex items-center justify-between px-3 py-4 text-lg font-bold"
                >
                  <span className="group-hover:text-ink group-focus-within:text-ink">
                    {item.text}
                  </span>
                  <ArrowUpRight
                    className="h-5 w-5 group-hover:text-ink group-focus-within:text-ink"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>

          {contactContent.sidebar.note && (
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {contactContent.sidebar.note}
            </p>
          )}
        </aside>
      </div>
    </>
  );
}
