"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Github,
  Linkedin,
  Mail,
  Upload,
} from "lucide-react";
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

const fieldClasses =
  "w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-accent-orange focus:ring-2 focus:ring-accent-orange/25";

export default function ContactPage() {
  const contactContent = getContactContent();
  const [form, setForm] = useState<FormState>(initialForm);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [isPending, startTransition] = useTransition();

  const socialLinks = [
    { ...contactContent.sidebar.links.email, Icon: Mail, external: false },
    {
      ...contactContent.sidebar.links.linkedin,
      Icon: Linkedin,
      external: true,
    },
    { ...contactContent.sidebar.links.github, Icon: Github, external: true },
    { ...contactContent.sidebar.links.resume, Icon: Upload, external: true },
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
    <div className="space-y-10 sm:space-y-12">
      <PageHeader
        badge={contactContent.badge}
        title={contactContent.pageTitle}
        description={contactContent.pageDescription}
        icon={<Mail className="h-3 w-3" aria-hidden="true" />}
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8">
        <section className="card p-5 sm:p-8">
          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-foreground"
                >
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
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-foreground"
                >
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

            <div className="space-y-2">
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-foreground"
              >
                {contactContent.form.messageLabel}
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={6}
                className={`${fieldClasses} resize-y`}
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {isPending
                ? contactContent.form.sendingText
                : contactContent.form.submitText}
            </button>

            <AnimatePresence>
              {toast ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.25 }}
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm ${
                    toast.type === "success"
                      ? "border-accent-orange/30 bg-accent-orange/10 text-accent-orange"
                      : "border-red-500/40 bg-red-500/10 text-red-600 dark:text-red-300"
                  }`}
                  role="status"
                  aria-live="polite"
                >
                  {toast.type === "success" ? (
                    <CheckCircle2
                      className="h-4 w-4 shrink-0"
                      aria-hidden="true"
                    />
                  ) : (
                    <AlertCircle
                      className="h-4 w-4 shrink-0"
                      aria-hidden="true"
                    />
                  )}
                  <span>{toast.message}</span>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </form>
        </section>

        <aside className="rounded-2xl border border-border bg-surface-muted p-5 sm:p-6">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {contactContent.sidebar.title}
          </p>

          <div className="mt-5 space-y-2">
            {socialLinks.map((item) => (
              <Link
                key={item.text}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-foreground transition hover:border-accent-orange/40 hover:text-accent-orange"
              >
                <item.Icon className="h-4 w-4" aria-hidden="true" />
                {item.text}
              </Link>
            ))}
          </div>

          {contactContent.sidebar.note && (
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              {contactContent.sidebar.note}
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
