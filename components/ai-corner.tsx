"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, MessageCircle, Send, Sparkles, User, X } from "lucide-react";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

const initialMessages: ChatMessage[] = [
  {
    id: "assistant-intro",
    role: "assistant",
    content:
      "Hey there! I’m the AI Corner—drop a prompt about Minjoon’s projects or research and I’ll share a tailored response.",
  },
];

const windowVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
  },
  exit: { opacity: 0, y: 24, scale: 0.96, transition: { duration: 0.2 } },
};

export function AICornerWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const typingIntervalRef = useRef<number>();

  const scrollToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom, isOpen]);

  useEffect(
    () => () => {
      if (typingIntervalRef.current) {
        window.clearInterval(typingIntervalRef.current);
      }
    },
    [],
  );

  const conversationPayload = useMemo(
    () =>
      messages.map(({ role, content }) => ({
        role,
        content,
      })),
    [messages],
  );

  const animateAssistantMessage = useCallback((text: string) => {
    if (typingIntervalRef.current) {
      window.clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = undefined;
    }

    const id = `assistant-${Date.now()}`;
    setMessages((prev) => [...prev, { id, role: "assistant", content: "" }]);
    setIsTyping(true);

    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setMessages((prev) =>
        prev.map((message) =>
          message.id === id
            ? { ...message, content: text.slice(0, index) }
            : message,
        ),
      );

      if (index >= text.length) {
        window.clearInterval(interval);
        typingIntervalRef.current = undefined;
        setIsTyping(false);
      }
    }, 18);

    typingIntervalRef.current = interval;
  }, []);

  const handleSubmit = async () => {
    if (!input.trim() || isSending) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setIsSending(true);
    setIsTyping(true);

    try {
      const response = await fetch("/api/ai-corner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...conversationPayload, userMessage],
        }),
      });

      if (!response.ok) {
        const errorPayload = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(
          errorPayload?.error ??
            "I ran into a hiccup reaching the model. Give it another shot soon!",
        );
      }

      const data = (await response.json()) as { message?: string };
      const message =
        data.message ??
        "The AI didn’t return any text, but I’m still here if you want to keep chatting.";

      animateAssistantMessage(message);
    } catch (error) {
      const fallback =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred talking to the model.";
      animateAssistantMessage(fallback);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void handleSubmit();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 sm:bottom-8 sm:right-8">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            key="ai-corner-window"
            id="ai-corner"
            variants={windowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-[min(92vw,360px)] overflow-hidden rounded-3xl border border-accent-indigo/40 bg-[#0f172a]/95 text-slate-100 shadow-[0_10px_45px_rgba(79,70,229,0.35)] backdrop-blur"
          >
            <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Sparkles className="h-4 w-4 text-accent-lavender" />
                AI Corner
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 text-slate-300 transition hover:bg-white/10 hover:text-white"
                aria-label="Close AI Corner"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="flex max-h-96 flex-col gap-4 overflow-y-auto px-4 py-4 text-sm">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.role === "user" ? "justify-end text-right" : ""
                  }`}
                >
                  {message.role === "assistant" ? (
                    <span className="mt-1 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent-indigo/30 text-white">
                      <Bot className="h-4 w-4" aria-hidden="true" />
                    </span>
                  ) : null}
                  <motion.p
                    initial={{ opacity: 0.85 }}
                    animate={{ opacity: 1 }}
                    className={`max-w-[80%] rounded-2xl px-4 py-3 leading-relaxed ${
                      message.role === "assistant"
                        ? "bg-white/10 text-slate-100"
                        : "bg-accent-indigo text-white shadow-glow"
                    }`}
                  >
                    {message.content}
                  </motion.p>
                  {message.role === "user" ? (
                    <span className="mt-1 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                      <User className="h-4 w-4" aria-hidden="true" />
                    </span>
                  ) : null}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <footer className="border-t border-white/10 bg-[#0b1221]/90 p-4">
              <div className="mb-2 text-xs text-slate-400">
                Ask about Minjoon’s projects, focus areas, or how the portfolio
                was assembled.
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-accent-indigo/40 bg-[#080d1a] px-2 py-2 shadow-[0_0_18px_rgba(99,102,241,0.45)]">
                <input
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    isTyping
                      ? "Thinking…"
                      : "Ask about a project or focus area…"
                  }
                  className="flex-1 bg-transparent text-sm text-slate-100 placeholder-slate-500 outline-none"
                  aria-label="Ask the AI assistant"
                  disabled={isSending}
                />
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.92 }}
                  disabled={isSending || input.trim().length === 0}
                  onClick={() => void handleSubmit()}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent-indigo text-white shadow-[0_0_18px_rgba(129,140,248,0.7)] transition hover:bg-accent-indigo/90 disabled:cursor-not-allowed disabled:opacity-60"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                </motion.button>
              </div>
              <AnimatePresence>
                {isTyping ? (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-2 flex items-center gap-2 text-xs text-accent-lavender"
                    aria-live="polite"
                  >
                    <span className="relative flex h-2 w-10 items-center justify-between">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-accent-lavender/80" />
                      <span
                        className="h-2 w-2 animate-pulse rounded-full bg-accent-lavender/80"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <span
                        className="h-2 w-2 animate-pulse rounded-full bg-accent-lavender/80"
                        style={{ animationDelay: "0.4s" }}
                      />
                    </span>
                    Crafting a reply…
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </footer>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setIsOpen((prev) => {
            const next = !prev;
            if (!prev) {
              window.setTimeout(scrollToBottom, 200);
            }
            return next;
          });
        }}
        aria-expanded={isOpen}
        aria-controls="ai-corner"
        className="inline-flex items-center gap-3 rounded-full bg-accent-indigo px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(129,140,248,0.4)] transition hover:bg-accent-indigo/90"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        AI Corner
      </motion.button>
    </div>
  );
}
