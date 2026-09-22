"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import BookCallCircle from "@/components/BookCallCircle";
import HeroSearchMock from "@/components/HeroSearchMock";
import ThArc from "@/components/ThArc";
import { INTRO_END_EVENT, INTRO_SKIP_ATTR } from "@/lib/homeIntro";

// Must match the "Home hero" gate in globals.css
const MOTION_QUERY =
  "(min-width: 990px) and (prefers-reduced-motion: no-preference)";

// Height of the sticky site header; the stage pins just below it
const HEADER_PX = 72;

// Circle diameter while it rises (the reference's 380px)
const BALL_PX = 380;

// Share of the pinned scroll given to each phase
const HOLD_BEAT_1 = 0.15;
const RISE = 0.35;
const EXPAND = 0.35;
// The rest (0.15) holds on full orange with beat 2

// If the intro never reports back, start beat 1 anyway
const INTRO_FALLBACK_MS = 6000;

const clamp = (v: number) => Math.min(1, Math.max(0, v));

// The reference's Power4 in-out, for the rise
const power4InOut = (p: number) =>
  p < 0.5 ? 8 * p ** 4 : 1 - (-2 * p + 2) ** 4 / 2;

// The reference's ease-in squared, for the expansion
const easeInSquared = (p: number) => p * p;

// Outside marketing noise that the orange circle covers. Positions are
// percentages of the stage, kept clear of the headline block; drift is in
// pixels over the pinned scroll.
const CHIPS = [
  { label: "New AI app", x: 71, y: 16, dx: -40, dy: 26, r: -3 },
  { label: "Free webinar", x: 85, y: 27, dx: 34, dy: 30, r: 2 },
  { label: "10x your output", x: 49, y: 9, dx: 30, dy: -18, r: 1.5 },
  { label: "Top 50 tools", x: 69, y: 76, dx: -30, dy: -34, r: 2.5 },
  { label: "Prompt pack", x: 86, y: 82, dx: 26, dy: -24, r: -2 },
  { label: "Book a demo", x: 41, y: 86, dx: 38, dy: -20, r: -1.5 },
  { label: "Must-try plugin", x: 8, y: 88, dx: -24, dy: -30, r: 2 },
];

// Chips fade in over the first part of the rise, and are gone by the time
// the circle covers the stage
const CHIP_IN_START = HOLD_BEAT_1;
const CHIP_IN_END = HOLD_BEAT_1 + 0.15;
const CHIP_GONE = HOLD_BEAT_1 + RISE + EXPAND;

/**
 * Homepage hero, three beats in an editorial layout. From 990px without
 * reduced motion, beat 1 is pinned while an orange circle rises and
 * expands to reveal beat 2, then beat 3 reveals on scroll entry.
 * Otherwise the beats stack in one column in their finished state.
 * The page's single h1 is beat 1's headline.
 */
export default function HomeHero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const beat2Ref = useRef<HTMLElement>(null);
  const beat3Ref = useRef<HTMLElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Motion mode (990px and wider, no reduced motion)
  const [motion, setMotion] = useState(false);
  // Beat 1 revealed: the intro has finished, or never played
  const [beat1Ready, setBeat1Ready] = useState(false);
  // The search bar is on screen and beat 1 is revealed
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(MOTION_QUERY);
    const sync = () => setMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Beat 1 starts when the intro's curtain lifts, or right away if the
  // intro is not playing (it sets the skip flag before this runs)
  useEffect(() => {
    if (!motion || beat1Ready) return;
    const go = () => setBeat1Ready(true);
    if (document.documentElement.hasAttribute(INTRO_SKIP_ATTR)) {
      go();
      return;
    }
    window.addEventListener(INTRO_END_EVENT, go, { once: true });
    const fallback = window.setTimeout(go, INTRO_FALLBACK_MS);
    return () => {
      window.removeEventListener(INTRO_END_EVENT, go);
      window.clearTimeout(fallback);
    };
  }, [motion, beat1Ready]);

  // Typing waits until the search bar is actually on screen
  useEffect(() => {
    const search = searchRef.current;
    if (!motion || !beat1Ready || typing || !search) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTyping(true);
        observer.disconnect();
      }
    });
    observer.observe(search);
    return () => observer.disconnect();
  }, [motion, beat1Ready, typing]);

  // Scroll-driven pin: circle, beat 2 clip, and noise chips
  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    const circle = circleRef.current;
    const beat2 = beat2Ref.current;
    const beat3 = beat3Ref.current;
    if (!motion || !track || !stage || !circle || !beat2 || !beat3) return;

    const chips = chipRefs.current.filter(
      (chip): chip is HTMLSpanElement => chip !== null
    );
    let width = 0;
    let height = 0;
    let cover = 0;
    let frame = 0;

    const measure = () => {
      width = stage.clientWidth;
      height = stage.clientHeight;
      // Diameter that covers the stage from its center, corner to corner
      cover = Math.ceil(Math.hypot(width, height)) + 2;
      stage.style.setProperty("--hero-cover", `${cover}px`);
    };

    const update = () => {
      frame = 0;
      const rect = track.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      const distance = track.offsetHeight - height;
      const p = clamp((HEADER_PX - rect.top) / distance);
      const rise = power4InOut(clamp((p - HOLD_BEAT_1) / RISE));
      const grow = easeInSquared(clamp((p - HOLD_BEAT_1 - RISE) / EXPAND));

      const yOffset = (1 - rise) * (height / 2 + BALL_PX / 2);
      const diameter = BALL_PX + grow * (cover - BALL_PX);

      circle.style.transform = `translateY(${yOffset}px) scale(${diameter / cover})`;
      beat2.style.clipPath = `circle(${diameter / 2}px at ${width / 2}px ${height / 2 + yOffset}px)`;

      const drift = clamp((p - CHIP_IN_START) / (CHIP_GONE - CHIP_IN_START));
      chips.forEach((chip, index) => {
        const c = CHIPS[index];
        const stagger = index * 0.012;
        const shown =
          p >= CHIP_GONE
            ? 0
            : clamp(
                (p - CHIP_IN_START - stagger) / (CHIP_IN_END - CHIP_IN_START)
              );
        chip.style.opacity = String(shown);
        chip.style.transform = `translate(${c.dx * drift}px, ${c.dy * drift}px) rotate(${c.r}deg)`;
      });
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      schedule();
    };

    measure();
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);

    // Beat 3: once about 35% is on screen, CSS runs the reveal
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          beat3.setAttribute("data-revealed", "");
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(beat3);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      circle.style.removeProperty("transform");
      beat2.style.removeProperty("clip-path");
      stage.style.removeProperty("--hero-cover");
      chips.forEach((chip) => {
        chip.style.removeProperty("opacity");
        chip.style.removeProperty("transform");
      });
    };
  }, [motion]);

  return (
    <div
      ref={rootRef}
      className="home-hero"
      data-beat1-ready={beat1Ready ? "" : undefined}
    >
      <div ref={trackRef} className="home-hero-track">
        <div ref={stageRef} className="home-hero-stage">
          <section className="home-hero-beat home-hero-beat-1">
            <div className="home-hero-copy">
              <p className="home-hero-label">01 · The situation</p>
              <h1 className="home-hero-headline">
                <span className="home-hero-hl">You&apos;re using AI </span>
                <span className="home-hero-hl">
                  like a{" "}
                  <span className="home-hero-marked">
                    search bar
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      className="home-hero-underline"
                      viewBox="0 0 220 10"
                      preserveAspectRatio="none"
                    >
                      {/* Drawn at the box's proportions (about 22:1) so the
                          stroke stays even without vector-effect */}
                      <path
                        d="M 2 7 C 48 3.5, 128 2.2, 218 4.8"
                        pathLength={1}
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  .
                </span>
              </h1>
              <p className="home-hero-line">
                You already pay for the tools. You ask a question, get an
                answer, then go back to doing the real work by hand. The
                board report still takes ten hours.
              </p>
            </div>
            <div ref={searchRef} className="home-hero-aside">
              <HeroSearchMock animate={motion} play={typing} />
            </div>
          </section>

          <div aria-hidden="true" className="home-hero-chips">
            {CHIPS.map((chip, index) => (
              <span
                key={chip.label}
                ref={(element) => {
                  chipRefs.current[index] = element;
                }}
                className="home-hero-chip"
                style={{ left: `${chip.x}%`, top: `${chip.y}%` }}
              >
                {chip.label}
              </span>
            ))}
          </div>

          <div ref={circleRef} aria-hidden="true" className="home-hero-circle" />

          <section ref={beat2Ref} className="home-hero-beat home-hero-beat-2">
            <div className="home-hero-copy">
              <p className="home-hero-label">02 · The flip</p>
              <h2 className="home-hero-headline">
                <span className="home-hero-hl">
                  Everyone&apos;s selling you a tool.{" "}
                </span>
                <span className="home-hero-hl">Nobody&apos;s asked about </span>
                <span className="home-hero-hl">your business.</span>
              </h2>
              <p className="home-hero-line">
                More apps, more courses, more demos. All of it starts with
                the software and hopes it fits your business. That&apos;s
                backwards.
              </p>
            </div>
          </section>
        </div>
      </div>

      <section ref={beat3Ref} className="home-hero-beat home-hero-beat-3">
        <div className="home-hero-copy">
          <p className="home-hero-label">03 · The answer</p>
          <h2 className="home-hero-headline">
            <RisingLine text="Your business first." start={0} trailingSpace />
            <ThArc aspect={13} className="home-hero-arc" />
            <RisingLine text="Then the AI." start={3} />
          </h2>
          <p className="home-hero-line home-hero-lede">
            I learn how your business actually runs, get you fluent on your
            own work, and build what&apos;s missing. That&apos;s Aithello.
          </p>
        </div>
        <div className="home-hero-aside home-hero-cta">
          <BookCallCircle />
        </div>
      </section>
    </div>
  );
}

// One hand-set headline line, split into words for the masked rise.
// `start` continues the 35ms stagger across lines.
function RisingLine({
  text,
  start,
  trailingSpace = false,
}: {
  text: string;
  start: number;
  trailingSpace?: boolean;
}) {
  const words = text.split(" ");
  return (
    <span className="home-hero-hl">
      {words.map((word, index) => (
        <span key={index}>
          <span className="home-hero-mask">
            <span
              className="home-hero-word"
              style={{ "--w": start + index } as CSSProperties}
            >
              {word}
            </span>
          </span>
          {index < words.length - 1 || trailingSpace ? " " : null}
        </span>
      ))}
    </span>
  );
}
