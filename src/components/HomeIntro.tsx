"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  INTRO_PLAY_QUERY,
  INTRO_SKIP_ATTR,
  INTRO_STORAGE_KEY,
} from "@/lib/homeIntro";

const WORDS = ["Noise.", "Hype.", "Confusion.", "Clarity.", "Sorted."];
const LAST = WORDS.length - 1;

const WORD_MS = 450;
const LAST_WORD_MS = 1000;
const CURTAIN_MS = 1200;
const FADE_MS = 150;
const CURTAIN_AT = WORD_MS * LAST + LAST_WORD_MS;

// If the page took longer than this to become interactive, the CSS
// fallback in globals.css may already be fading the overlay; skip instead.
const LATE_MS = 4000;

type Phase = "pending" | "words" | "curtain" | "leaving" | "done";

// cubic-bezier() as a function of x, for --ease-brand in the rAF loop
function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const bez = (t: number, a: number, b: number) =>
    3 * a * t * (1 - t) ** 2 + 3 * b * t ** 2 * (1 - t) + t ** 3;
  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let lo = 0;
    let hi = 1;
    let t = x;
    for (let i = 0; i < 24; i++) {
      const cx = bez(t, x1, x2);
      if (Math.abs(cx - x) < 1e-5) break;
      if (cx < x) lo = t;
      else hi = t;
      t = (lo + hi) / 2;
    }
    return bez(t, y1, y2);
  };
}

// Spec section 7 shared easing token, cubic-bezier(0.65, 0.05, 0.36, 1)
const easeBrand = cubicBezier(0.65, 0.05, 0.36, 1);

// The curtain's leading edge: a quadratic curve whose middle bows 25 units
// below its ends, rising from below the screen (p = 0) to above it (p = 1)
function curtainPath(p: number) {
  const edge = 110 - p * 140;
  return `M 0 ${edge} Q 50 ${edge + 25} 100 ${edge} L 100 110 L 0 110 Z`;
}

function shouldPlay() {
  if (document.documentElement.hasAttribute(INTRO_SKIP_ATTR)) return false;
  if (!window.matchMedia(INTRO_PLAY_QUERY).matches) return false;
  if (performance.now() > LATE_MS) return false;
  try {
    return window.sessionStorage.getItem(INTRO_STORAGE_KEY) === "pending";
  } catch {
    return false;
  }
}

function rememberPlayed() {
  try {
    window.sessionStorage.setItem(INTRO_STORAGE_KEY, "done");
  } catch {
    // Storage blocked: the head script already skips in that case
  }
}

/**
 * Homepage intro: five words, then a cobalt curtain with a curved edge
 * rises and the overlay fades to reveal the page. Plays once per session,
 * only when the session starts on "/", only at 990px and wider without
 * reduced motion. The page renders underneath the whole time; the overlay
 * is aria-hidden and holds nothing focusable.
 */
export default function HomeIntro() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("pending");
  const [wordIndex, setWordIndex] = useState(-1);
  const phaseRef = useRef<Phase>("pending");
  const pathRef = useRef<SVGPathElement>(null);
  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;

  const isHome = pathname === "/";

  useLayoutEffect(() => {
    if (!isHome || phaseRef.current !== "pending") return;

    const root = document.documentElement;
    const finish = () => {
      root.setAttribute(INTRO_SKIP_ATTR, "");
      phaseRef.current = "done";
      setPhase("done");
    };

    // Any reason not to play (narrow screen, reduced motion, slow load)
    // rules the intro out for the rest of the session
    if (!shouldPlay()) {
      rememberPlayed();
      finish();
      return;
    }

    rememberPlayed();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let frame = 0;
    let fadeTimer = 0;
    let shownIndex = -1;
    let curtainStart = 0;
    const start = performance.now();

    const moveTo = (next: Phase) => {
      phaseRef.current = next;
      setPhase(next);
    };

    const beginCurtain = (now: number) => {
      curtainStart = now;
      moveTo("curtain");
    };

    const tick = (now: number) => {
      if (phaseRef.current === "words") {
        const elapsed = now - start;
        if (elapsed >= CURTAIN_AT) {
          beginCurtain(now);
        } else {
          const index = Math.min(Math.floor(elapsed / WORD_MS), LAST);
          if (index !== shownIndex) {
            shownIndex = index;
            setWordIndex(index);
          }
        }
      }

      if (phaseRef.current === "curtain") {
        const p = Math.min((now - curtainStart) / CURTAIN_MS, 1);
        pathRef.current?.setAttribute("d", curtainPath(easeBrand(p)));
        if (p >= 1) {
          moveTo("leaving");
          fadeTimer = window.setTimeout(finish, FADE_MS);
          return;
        }
      }

      frame = requestAnimationFrame(tick);
    };

    // Any click, scroll, or key press skips straight to the curtain
    const skip = () => {
      if (phaseRef.current === "words") beginCurtain(performance.now());
    };
    const events = ["pointerdown", "wheel", "touchmove", "keydown"] as const;
    events.forEach((type) =>
      window.addEventListener(type, skip, { passive: true })
    );

    moveTo("words");
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(fadeTimer);
      events.forEach((type) => window.removeEventListener(type, skip));
      document.body.style.overflow = previousOverflow;
      if (phaseRef.current === "done") return;
      if (pathnameRef.current === "/") {
        // Interrupted while still on "/" (for example React's development
        // double-run): reset so the next run starts the intro cleanly
        phaseRef.current = "pending";
        try {
          window.sessionStorage.setItem(INTRO_STORAGE_KEY, "pending");
        } catch {
          // Storage blocked: the head script already skips in that case
        }
      } else {
        // Left "/" mid-intro: never play it again this session
        root.setAttribute(INTRO_SKIP_ATTR, "");
        phaseRef.current = "done";
      }
    };
  }, [isHome]);

  // Safety: never leave the page scroll-locked if the intro unmounts early
  useEffect(() => {
    if (phase === "done") document.body.style.removeProperty("overflow");
  }, [phase]);

  if (!isHome || phase === "done") return null;

  const word = wordIndex >= 0 ? WORDS[wordIndex] : null;
  const isLast = wordIndex === LAST;

  return (
    <div
      aria-hidden="true"
      data-running={phase === "pending" ? undefined : ""}
      data-leaving={phase === "leaving" ? "" : undefined}
      className="home-intro fixed inset-0 z-intro overflow-hidden bg-brand-ground"
    >
      <div className="absolute inset-0 flex items-center justify-center [container-type:inline-size]">
        {word && (
          <span
            key={wordIndex}
            className={`home-intro-word ${isLast ? "home-intro-word-last" : ""}`}
          >
            {isLast ? (
              <>
                {word.slice(0, -1)}
                <span className="brand-period" />
              </>
            ) : (
              word
            )}
          </span>
        )}
      </div>

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path ref={pathRef} d={curtainPath(0)} className="fill-brand-cobalt" />
      </svg>
    </div>
  );
}
