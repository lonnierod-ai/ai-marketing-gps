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

// The pinned sequence, as shares of the pinned scroll:
//   0.00-0.15  hold on beat 1 (the search bar types, on a timer)
//   0.15-0.40  noise chips pile up, one at a time
//   0.40-0.50  hold on the full pile
//   0.50-0.66  the circle rises
//   0.66-0.90  the circle expands and covers the pile
//   0.90-0.95  beat 2 finishes its reveal (starts once the circle covers
//              its headline block)
//   0.95-1.00  hold on full orange with beat 2
const CHIPS_START = 0.15;
const CHIPS_END = 0.4;
const CHIP_ARRIVE = 0.03;
const RISE_START = 0.5;
const RISE_END = 0.66;
const EXPAND_END = 0.9;
const CHIPS_FADE_START = 0.86;
const CHIPS_FADE_END = 0.895;
const BEAT_2_REVEALED = 0.95;

// If the intro never reports back, start beat 1 anyway
const INTRO_FALLBACK_MS = 6000;

const clamp = (v: number) => Math.min(1, Math.max(0, v));

// The reference's Power4 in-out, for the rise
const power4InOut = (p: number) =>
  p < 0.5 ? 8 * p ** 4 : 1 - (-2 * p + 2) ** 4 / 2;

// The reference's ease-in squared, for the expansion
const easeInSquared = (p: number) => p * p;

const easeOutCubic = (p: number) => 1 - (1 - p) ** 3;

// Outside marketing noise, piled over the search bar. Tilts and sideways
// offsets are fixed, so the pile looks hand-stacked and never reshuffles.
const CHIPS = [
  { label: "New AI app", tilt: -2, shift: 0 },
  { label: "Free webinar", tilt: 1.5, shift: 10 },
  { label: "Top 50 tools", tilt: -3, shift: -6 },
  { label: "Prompt pack", tilt: 2.5, shift: 12 },
  { label: "Book a demo", tilt: -1, shift: -10 },
  { label: "Must-try plugin", tilt: 3, shift: 4 },
  { label: "10x your output", tilt: -2.5, shift: -12 },
];

// Each chip sits this far above the one before it (chips are about 40px
// tall, so they overlap slightly)
const CHIP_STEP_PX = 30;
// How far each chip slides in from the right
const CHIP_SLIDE_PX = 120;

// Chip i arrives over [start, start + CHIP_ARRIVE], evenly spaced so the
// last one lands at CHIPS_END
const chipStart = (index: number) =>
  CHIPS_START +
  (index * (CHIPS_END - CHIPS_START - CHIP_ARRIVE)) / (CHIPS.length - 1);

// Beat 2 rises into place by this much as it fades in
const BEAT_2_RISE_PX = 24;

/**
 * Homepage hero, three beats in an editorial layout. From 990px without
 * reduced motion, beat 1 is pinned while noise piles up over its search
 * bar, then an orange circle rises and expands to cover it and reveal
 * beat 2; beat 3 reveals on scroll entry. Otherwise the beats stack in
 * one column in their finished state. Beat 1's headline is the page's
 * single h1.
 */
export default function HomeHero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const beat2Ref = useRef<HTMLElement>(null);
  const beat2CopyRef = useRef<HTMLDivElement>(null);
  const beat3Ref = useRef<HTMLElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const pileRef = useRef<HTMLDivElement>(null);
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

  // Typing is time-based and waits until the search bar is on screen
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

  // Scroll-driven pin: chip pile, circle, beat 2 clip and reveal
  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    const circle = circleRef.current;
    const beat2 = beat2Ref.current;
    const beat2Copy = beat2CopyRef.current;
    const beat3 = beat3Ref.current;
    const search = searchRef.current?.querySelector<HTMLElement>(".hero-search");
    const pile = pileRef.current;
    if (
      !motion ||
      !track ||
      !stage ||
      !circle ||
      !beat2 ||
      !beat2Copy ||
      !beat3 ||
      !search ||
      !pile
    ) {
      return;
    }

    const chips = chipRefs.current.filter(
      (chip): chip is HTMLSpanElement => chip !== null
    );
    let width = 0;
    let height = 0;
    let cover = 0;
    let beat2From = EXPAND_END;
    let frame = 0;

    const measure = () => {
      width = stage.clientWidth;
      height = stage.clientHeight;
      // Diameter that covers the stage from its center, corner to corner
      cover = Math.ceil(Math.hypot(width, height)) + 2;
      stage.style.setProperty("--hero-cover", `${cover}px`);

      const stageBox = stage.getBoundingClientRect();

      // Pile: right-aligned to the search bar, its bottom over the lower
      // part of the search bar and answer
      const searchBox = search.getBoundingClientRect();
      pile.style.right = `${stageBox.right - searchBox.right}px`;
      pile.style.top = `${searchBox.bottom - stageBox.top - 20}px`;
      pile.style.width = `${searchBox.width}px`;

      // Beat 2 starts revealing once the circle (centered by then) covers
      // its whole headline block. Measure without the reveal's offset.
      const previous = beat2Copy.style.transform;
      beat2Copy.style.transform = "none";
      const headline = beat2Copy
        .querySelector(".home-hero-headline")!
        .getBoundingClientRect();
      beat2Copy.style.transform = previous;
      const cx = stageBox.left + width / 2;
      const cy = stageBox.top + height / 2;
      const needed =
        2 *
        Math.max(
          ...[
            [headline.left, headline.top],
            [headline.right, headline.top],
            [headline.left, headline.bottom],
            [headline.right, headline.bottom],
          ].map(([x, y]) => Math.hypot(x - cx, y - cy))
        );
      const grow = clamp((needed - BALL_PX) / (cover - BALL_PX));
      // Invert ease-in squared to find where in the expansion that happens
      beat2From = RISE_END + Math.sqrt(grow) * (EXPAND_END - RISE_END);
    };

    const update = () => {
      frame = 0;
      const rect = track.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      const distance = track.offsetHeight - height;
      const p = clamp((HEADER_PX - rect.top) / distance);

      // Circle and beat 2's clip
      const rise = power4InOut(clamp((p - RISE_START) / (RISE_END - RISE_START)));
      const grow = easeInSquared(clamp((p - RISE_END) / (EXPAND_END - RISE_END)));
      const yOffset = (1 - rise) * (height / 2 + BALL_PX / 2);
      const diameter = BALL_PX + grow * (cover - BALL_PX);
      circle.style.transform = `translateY(${yOffset}px) scale(${diameter / cover})`;
      beat2.style.clipPath = `circle(${diameter / 2}px at ${width / 2}px ${height / 2 + yOffset}px)`;

      // Beat 2's text: hidden until the circle covers its headline block
      const reveal = clamp((p - beat2From) / (BEAT_2_REVEALED - beat2From));
      beat2Copy.style.opacity = String(reveal);
      beat2Copy.style.transform = `translateY(${(1 - easeOutCubic(reveal)) * BEAT_2_RISE_PX}px)`;

      // Chips: slide in one at a time (in reverse on the way back up), and
      // fade out before the screen is fully orange
      const fadeOut = 1 - clamp((p - CHIPS_FADE_START) / (CHIPS_FADE_END - CHIPS_FADE_START));
      chips.forEach((chip, index) => {
        const arrived = clamp((p - chipStart(index)) / CHIP_ARRIVE);
        const slide = (1 - easeOutCubic(arrived)) * CHIP_SLIDE_PX;
        chip.style.opacity = String(arrived * fadeOut);
        chip.style.transform = `translateX(${slide + CHIPS[index].shift}px) rotate(${CHIPS[index].tilt}deg)`;
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
    // Web font swaps change text boxes; remeasure once they settle
    document.fonts?.ready.then(onResize);

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
      beat2Copy.style.removeProperty("opacity");
      beat2Copy.style.removeProperty("transform");
      stage.style.removeProperty("--hero-cover");
      ["right", "top", "width"].forEach((prop) => pile.style.removeProperty(prop));
      chips.forEach((chip) => {
        chip.style.removeProperty("opacity");
        chip.style.removeProperty("transform");
      });
    };
  }, [motion]);

  return (
    <div
      className="home-hero"
      data-beat1-ready={beat1Ready ? "" : undefined}
    >
      <div ref={trackRef} className="home-hero-track">
        <div ref={stageRef} className="home-hero-stage">
          <section className="home-hero-beat home-hero-beat-1">
            <div className="home-hero-copy">
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

          <div ref={pileRef} aria-hidden="true" className="home-hero-pile">
            {CHIPS.map((chip, index) => (
              <span
                key={chip.label}
                ref={(element) => {
                  chipRefs.current[index] = element;
                }}
                className="home-hero-chip"
                style={{ bottom: `${index * CHIP_STEP_PX}px` }}
              >
                {chip.label}
              </span>
            ))}
          </div>

          <div ref={circleRef} aria-hidden="true" className="home-hero-circle" />

          <section ref={beat2Ref} className="home-hero-beat home-hero-beat-2">
            <div ref={beat2CopyRef} className="home-hero-copy">
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
          <h2 className="home-hero-headline">
            <RisingLine text="Your business first." start={0} trailingSpace />
            <RisingLine text="Then the AI." start={3} />
            {/* Overlaid, so it adds no space: sweeps from just past
                "first." down to just before "Then" */}
            <ThArc aspect={33} reverse className="home-hero-arc" />
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
