"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import BookCallCircle from "@/components/BookCallCircle";

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

const clamp = (v: number) => Math.min(1, Math.max(0, v));

// The reference's Power4 in-out, for the rise
const power4InOut = (p: number) =>
  p < 0.5 ? 8 * p ** 4 : 1 - (-2 * p + 2) ** 4 / 2;

// The reference's ease-in squared, for the expansion
const easeInSquared = (p: number) => p * p;

const BEAT_3_HEADLINE = "Your business first. Then the AI.";

/**
 * Homepage hero, three beats. From 990px without reduced motion, beat 1 is
 * pinned while an orange circle rises and expands to reveal beat 2, then
 * beat 3 reveals on scroll entry. Otherwise the beats simply stack.
 * The page's single h1 is beat 1's headline.
 */
export default function HomeHero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const beat2Ref = useRef<HTMLElement>(null);
  const beat3Ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    const circle = circleRef.current;
    const beat2 = beat2Ref.current;
    const beat3 = beat3Ref.current;
    if (!track || !stage || !circle || !beat2 || !beat3) return;

    const mq = window.matchMedia(MOTION_QUERY);
    let stop = () => {};

    const startMotion = () => {
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
      };
    };

    const apply = () => {
      stop();
      stop = mq.matches ? startMotion() : () => {};
    };

    apply();
    mq.addEventListener("change", apply);
    return () => {
      stop();
      mq.removeEventListener("change", apply);
    };
  }, []);

  const words = BEAT_3_HEADLINE.split(" ");

  return (
    <div className="home-hero">
      <div ref={trackRef} className="home-hero-track">
        <div ref={stageRef} className="home-hero-stage">
          <section className="home-hero-beat home-hero-beat-1">
            <h1 className="home-hero-headline">
              You&apos;re using AI like a search bar.
            </h1>
            <p className="home-hero-line">
              You already pay for the tools. You ask a question, get an
              answer, then go back to doing the real work by hand. The board
              report still takes ten hours.
            </p>
          </section>

          <div ref={circleRef} aria-hidden="true" className="home-hero-circle" />

          <section ref={beat2Ref} className="home-hero-beat home-hero-beat-2">
            <h2 className="home-hero-headline">
              Everyone&apos;s selling you a tool. Nobody&apos;s asked about
              your business.
            </h2>
            <p className="home-hero-line">
              More apps, more courses, more demos. All of it starts with the
              software and hopes it fits your business. That&apos;s
              backwards.
            </p>
          </section>
        </div>
      </div>

      <section ref={beat3Ref} className="home-hero-beat home-hero-beat-3">
        <h2 className="home-hero-headline">
          {words.map((word, index) => (
            <span key={index}>
              <span className="home-hero-mask">
                <span
                  className="home-hero-word"
                  style={{ "--w": index } as CSSProperties}
                >
                  {word}
                </span>
              </span>
              {index < words.length - 1 ? " " : null}
            </span>
          ))}
        </h2>
        <p className="home-hero-line home-hero-lede">
          I learn how your business actually runs, get you fluent on your own
          work, and build what&apos;s missing. That&apos;s Aithello.
        </p>
        <div className="home-hero-cta">
          <BookCallCircle />
        </div>
      </section>
    </div>
  );
}
