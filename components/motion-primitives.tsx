"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

/* -------------------------------------------------------------------------- */
/*  Reveal — fades + lifts content into view the first time it is scrolled to  */
/* -------------------------------------------------------------------------- */

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before starting. Use to cascade sibling reveals. */
  delay?: number;
  /** Distance in px the element travels on the way in. */
  distance?: number;
  as?: "div" | "section" | "li" | "article";
};

export function Reveal({
  children,
  className,
  delay = 0,
  distance = 22,
  as = "div",
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={
        shouldReduceMotion
          ? { opacity: 0 }
          : { opacity: 0, y: distance, filter: "blur(6px)" }
      }
      whileInView={
        shouldReduceMotion
          ? { opacity: 1 }
          : { opacity: 1, y: 0, filter: "blur(0px)" }
      }
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}

/* -------------------------------------------------------------------------- */
/*  AnimatedText — reveals a headline one word at a time                       */
/* -------------------------------------------------------------------------- */

const wordContainer: Variants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: { staggerChildren: stagger },
  }),
};

const wordChild: Variants = {
  hidden: { opacity: 0, y: "0.45em", filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: "0em",
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

type AnimatedTextProps = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
};

export function AnimatedText({
  text,
  className,
  delay = 0,
  stagger = 0.055,
}: AnimatedTextProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <motion.span
      className={className}
      variants={wordContainer}
      custom={stagger}
      initial="hidden"
      animate="visible"
      transition={{ delayChildren: delay }}
      aria-label={text}
    >
      {text.split(" ").map((word, index) => (
        <span
          key={`${word}-${index}`}
          // The clip keeps each word hidden until it slides up into place
          className="inline-block overflow-hidden pb-[0.06em] align-bottom"
          aria-hidden="true"
        >
          <motion.span className="inline-block" variants={wordChild}>
            {word}
            {index < text.split(" ").length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/* -------------------------------------------------------------------------- */
/*  CountUp — animates a numeric stat when it scrolls into view                */
/* -------------------------------------------------------------------------- */

/** Splits "20,000+" into its prefix, numeric target and suffix so the number
 *  can animate while the surrounding characters stay put. */
function parseStat(value: string) {
  const match = value.match(/^(\D*?)([\d,]+(?:\.\d+)?)(.*)$/);
  if (!match) return null;

  const [, prefix, rawNumber, suffix] = match;
  const decimals = rawNumber.includes(".") ? rawNumber.split(".")[1].length : 0;

  return {
    prefix,
    suffix,
    decimals,
    grouped: rawNumber.includes(","),
    target: Number.parseFloat(rawNumber.replace(/,/g, "")),
  };
}

export function CountUp({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const parsed = parseStat(value);

  const count = useMotionValue(0);
  const display = useTransform(count, (latest) => {
    if (!parsed) return value;
    const rounded = parsed.grouped
      ? Math.round(latest).toLocaleString("en-US")
      : latest.toFixed(parsed.decimals);
    return `${parsed.prefix}${rounded}${parsed.suffix}`;
  });

  useEffect(() => {
    if (!parsed || !isInView || shouldReduceMotion) return;

    const controls = animate(count, parsed.target, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
    });

    return () => controls.stop();
  }, [count, isInView, parsed, shouldReduceMotion]);

  // Static fallback for non-numeric values and reduced-motion users
  if (!parsed || shouldReduceMotion) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {/* Reserves the final width so the layout does not jitter while counting */}
      <span className="invisible block h-0 overflow-hidden" aria-hidden="true">
        {value}
      </span>
      <motion.span aria-label={value}>{display}</motion.span>
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Spotlight — a soft glow that tracks the cursor across a card               */
/* -------------------------------------------------------------------------- */

type SpotlightProps = {
  children: ReactNode;
  className?: string;
};

export function Spotlight({ children, className = "" }: SpotlightProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    node.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
    node.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={shouldReduceMotion ? undefined : handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative isolate ${className}`}
      style={
        {
          "--spotlight-x": "50%",
          "--spotlight-y": "50%",
        } as CSSProperties
      }
    >
      {!shouldReduceMotion && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background:
              "radial-gradient(20rem circle at var(--spotlight-x) var(--spotlight-y), rgb(var(--accent-orange) / 0.10), transparent 65%)",
          }}
        />
      )}
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Marquee — an endlessly scrolling strip of items                            */
/* -------------------------------------------------------------------------- */

export function Marquee({
  items,
  speed = 38,
}: {
  items: string[];
  speed?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className="flex flex-wrap justify-center gap-2">
        {items.map((item) => (
          <span key={item} className="chip">
            {item}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div
      className="group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
      aria-hidden="true"
    >
      {/* Two identical tracks sit side by side so the loop never shows a seam */}
      {[0, 1].map((track) => (
        <motion.div
          key={track}
          className="flex shrink-0 items-center gap-3 pr-3"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            duration: speed,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {items.map((item) => (
            <span
              key={`${track}-${item}`}
              className="whitespace-nowrap rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-muted-foreground"
            >
              {item}
            </span>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
