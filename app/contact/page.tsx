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

export default function ContactPage() {
  const contactContent = getContactContent();
  const [form, setForm] = useState<FormState>(initialForm);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [isPending, startTransition] = useTransition();

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
    <div className="space-y-10">
      <header className="space-y-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-orange-300/40 bg-orange-100/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-orange-700 dark:border-orange-600/40 dark:bg-orange-900/30 dark:text-orange-300">
          <Mail className="h-3.5 w-3.5" aria-hidden="true" />
          {contactContent.badge}
        </span>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {contactContent.pageTitle}
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {contactContent.pageDescription}
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section className="rounded-3xl border border-orange-200 bg-orange-50/80 p-8 shadow-sm backdrop-blur dark:bg-orange-950/70">
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-semibold text-foreground">
                {contactContent.form.nameLabel}
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  className="rounded-2xl border border-orange-200 bg-orange-50/90 px-4 py-3 text-sm text-foreground outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/40 dark:bg-orange-950/70"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-semibold text-foreground">
                {contactContent.form.emailLabel}
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="rounded-2xl border border-orange-200 bg-orange-50/90 px-4 py-3 text-sm text-foreground outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/40 dark:bg-orange-950/70"
                />
              </label>
            </div>
            <label className="flex flex-col gap-2 text-sm font-semibold text-foreground">
              {contactContent.form.messageLabel}
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="resize-y rounded-2xl border border-orange-200 bg-orange-50/90 px-4 py-3 text-sm text-foreground outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/40 dark:bg-orange-950/70"
              />
            </label>

            <motion.button
              type="submit"
              whileTap={{ scale: 0.96 }}
              disabled={isPending}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isPending ? contactContent.form.sendingText : contactContent.form.submitText}
            </motion.button>

            <AnimatePresence>
              {toast ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25 }}
                  className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm ${
                    toast.type === "success"
                      ? "border-orange-400/40 bg-orange-100/20 text-orange-700 dark:border-orange-500/40 dark:bg-orange-900/30 dark:text-orange-300"
                      : "border-red-400/60 bg-red-100/60 text-red-700 dark:border-red-400/40 dark:bg-red-500/20 dark:text-red-100"
                  }`}
                  role="status"
                  aria-live="polite"
                >
                  {toast.type === "success" ? (
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <AlertCircle className="h-4 w-4" aria-hidden="true" />
                  )}
                  <span>{toast.message}</span>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </form>
        </section>

        <aside className="space-y-4 rounded-3xl border border-dashed border-orange-300/50 bg-orange-100/20 p-6 text-sm leading-relaxed text-muted-foreground dark:border-orange-600/50 dark:bg-orange-900/20">
          <p>
            {contactContent.sidebar.title}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={contactContent.sidebar.links.email.href}
              className="inline-flex items-center gap-2 rounded-full border border-orange-400/60 px-4 py-2 text-sm font-semibold text-orange-600 transition hover:bg-orange-100/20 dark:text-orange-400 dark:hover:bg-orange-900/30"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {contactContent.sidebar.links.email.text}
            </Link>
            <Link
              href={contactContent.sidebar.links.linkedin.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-orange-400/60 px-4 py-2 text-sm font-semibold text-orange-600 transition hover:bg-orange-100/20 dark:text-orange-400 dark:hover:bg-orange-900/30"
            >
              <Linkedin className="h-4 w-4" aria-hidden="true" />
              {contactContent.sidebar.links.linkedin.text}
            </Link>
            <Link
              href={contactContent.sidebar.links.github.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-orange-400/60 px-4 py-2 text-sm font-semibold text-orange-600 transition hover:bg-orange-100/20 dark:text-orange-400 dark:hover:bg-orange-900/30"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              {contactContent.sidebar.links.github.text}
            </Link>
            <Link
              href={contactContent.sidebar.links.resume.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-orange-400/60 px-4 py-2 text-sm font-semibold text-orange-600 transition hover:bg-orange-100/20 dark:text-orange-400 dark:hover:bg-orange-900/30"
            >
              <Upload className="h-4 w-4" aria-hidden="true" />
              {contactContent.sidebar.links.resume.text}
            </Link>
          </div>
          <p className="text-xs text-muted-foreground">
            {contactContent.sidebar.note}
          </p>
        </aside>
      </div>
    </div>
  );
}
