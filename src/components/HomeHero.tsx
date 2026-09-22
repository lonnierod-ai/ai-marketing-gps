"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import BookCallCircle from "@/components/BookCallCircle";
import HeroNotificationStack, {
  NOTIFICATIONS,
} from "@/components/HeroNotificationStack";
import HeroSearchMock from "@/components/HeroSearchMock";
import ScrollCue from "@/components/ScrollCue";
import TypedLine from "@/components/TypedLine";
import { INTRO_END_EVENT, INTRO_SKIP_ATTR } from "@/lib/homeIntro";

// Must match the "Home hero" gate in globals.css
const MOTION_QUERY =
  "(min-width: 990px) and (prefers-reduced-motion: no-preference)";

// Height of the sticky site header; the stage pins just below it
const HEADER_PX = 72;

// Circle diameter while it rises (the reference's 380px)
const BALL_PX = 380;

// The pinned sequence, as shares of the pinned scroll:
//   0.00-0.20  hold on beat 1 (the search bar types, on a timer)
//   0.20-0.45  the circle rises
//   0.45-0.85  the circle expands; beat 2 starts revealing once the
//              circle covers its headline block
//   0.85-0.90  beat 2 finishes its reveal
//   0.90-1.00  hold on orange; beat 2's line types and its chips drop in
//              (both on a timer)
const RISE_START = 0.2;
const RISE_END = 0.45;
const EXPAND_END = 0.85;
const BEAT_2_REVEALED = 0.9;

// If the intro never reports back, start beat 1 anyway
const INTRO_FALLBACK_MS = 6000;

const clamp = (v: number) => Math.min(1, Math.max(0, v));

// The reference's Power4 in-out, for the rise
const power4InOut = (p: number) =>
  p < 0.5 ? 8 * p ** 4 : 1 - (-2 * p + 2) ** 4 / 2;

// The reference's ease-in squared, for the expansion
const easeInSquared = (p: number) => p * p;

const easeOutCubic = (p: number) => 1 - (1 - p) ** 3;

// Beat 2's notifications land at least this far apart, in order
const NOTE_GAP_MS = 150;

// Beat 2 rises into place by this much as it fades in
const BEAT_2_RISE_PX = 24;

// Beat 3's line starts typing at this point in its reveal (where the
// fade-up used to start)
const BEAT_3_LINE_DELAY_MS = 1100;

// Scroll cue: appears this long after the search bar's answer (or after
// load where the search bar is already finished), and leaves for good
// after this much scrolling
const CUE_AFTER_SEARCH_MS = 400;
const CUE_AFTER_LOAD_MS = 1500;
const CUE_GONE_PX = 40;

const BEAT_2_LINE =
  "More apps, more courses, more demos. All of it starts with the software and hopes it fits your business. That's backwards.";

// Notification pairs are cued as these points of beat 2's line are typed:
// when "apps", "courses", and "demos" finish, and as "That's backwards."
// begins. Values are typed-character counts.
const wordEnd = (word: string) => BEAT_2_LINE.indexOf(word) + word.length;
const NOTE_CUES = [
  wordEnd("apps"),
  wordEnd("courses"),
  wordEnd("demos"),
  BEAT_2_LINE.indexOf("That's") + 1,
];
const BEAT_3_LINE =
  "I learn how your business actually runs, get you fluent on your own work, and build what's missing. That's Aithello.";

/**
 * Homepage hero, three beats in an editorial layout. From 990px without
 * reduced motion, beat 1 is pinned while an orange circle rises and
 * expands to reveal beat 2, whose line types while outside-marketing
 * notifications stack up beside it; beat 3 reveals when it reaches the
 * header.
 * Otherwise the beats stack in one column in their finished state.
 * Beat 1's headline is the page's single h1.
 */
export default function HomeHero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const beat2Ref = useRef<HTMLElement>(null);
  const beat2CopyRef = useRef<HTMLDivElement>(null);
  const beat3Ref = useRef<HTMLElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Motion mode (990px and wider, no reduced motion)
  const [motion, setMotion] = useState(false);
  // Beat 1 revealed: the intro has finished, or never played
  const [beat1Ready, setBeat1Ready] = useState(false);
  // The search bar is on screen and beat 1 is revealed
  const [typing, setTyping] = useState(false);
  const [searchDone, setSearchDone] = useState(false);
  // Supporting lines type once, when their beat gets to them
  const [beat2Typing, setBeat2Typing] = useState(false);
  const [beat3Typing, setBeat3Typing] = useState(false);
  // Scroll cue
  const [cueShown, setCueShown] = useState(false);
  const [cueGone, setCueGone] = useState(false);

  const onSearchDone = useCallback(() => setSearchDone(true), []);

  // Beat 2's notifications: how many have landed. Each typing cue queues
  // a pair; a queue releases them one at a time, at least NOTE_GAP_MS
  // apart, so they always arrive in order. Plays once; they stay.
  const [notesIn, setNotesIn] = useState(0);
  const cuesFired = useRef(0);
  const noteQueue = useRef({ queued: 0, released: 0, lastAt: -Infinity, timer: 0 });
  const releaseNotes = useCallback(() => {
    const q = noteQueue.current;
    if (q.timer || q.released >= q.queued) return;
    const wait = q.lastAt + NOTE_GAP_MS - performance.now();
    if (wait > 0) {
      q.timer = window.setTimeout(() => {
        q.timer = 0;
        releaseNotes();
      }, wait);
      return;
    }
    q.released += 1;
    q.lastAt = performance.now();
    setNotesIn(q.released);
    releaseNotes();
  }, []);
  const onBeat2Typed = useCallback(
    (typed: number) => {
      while (
        cuesFired.current < NOTE_CUES.length &&
        typed >= NOTE_CUES[cuesFired.current]
      ) {
        cuesFired.current += 1;
        noteQueue.current.queued = Math.min(
          cuesFired.current * 2,
          NOTIFICATIONS.length
        );
      }
      releaseNotes();
    },
    [releaseNotes]
  );
  useEffect(() => {
    const q = noteQueue.current;
    return () => window.clearTimeout(q.timer);
  }, []);

  // Scroll cue in: after the search bar's answer, or after load where the
  // search bar is already finished (phones, reduced motion)
  useEffect(() => {
    if (cueShown) return;
    if (motion && !searchDone) return;
    const timer = window.setTimeout(
      () => setCueShown(true),
      motion ? CUE_AFTER_SEARCH_MS : CUE_AFTER_LOAD_MS
    );
    return () => window.clearTimeout(timer);
  }, [motion, searchDone, cueShown]);

  // Scroll cue out, for the rest of the visit, once the page has scrolled
  useEffect(() => {
    if (cueGone) return;
    const startY = window.scrollY;
    const onScroll = () => {
      if (Math.abs(window.scrollY - startY) > CUE_GONE_PX) setCueGone(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [cueGone]);

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

  // Scroll-driven pin: circle, beat 2 clip and reveal
  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    const circle = circleRef.current;
    const beat2 = beat2Ref.current;
    const beat2Copy = beat2CopyRef.current;
    const beat3 = beat3Ref.current;
    if (
      !motion ||
      !track ||
      !stage ||
      !circle ||
      !beat2 ||
      !beat2Copy ||
      !beat3
    ) {
      return;
    }

    let width = 0;
    let height = 0;
    let cover = 0;
    let beat2From = EXPAND_END;
    let beat2Typed = false;
    let frame = 0;

    const measure = () => {
      width = stage.clientWidth;
      height = stage.clientHeight;
      // Diameter that covers the stage from its center, corner to corner
      cover = Math.ceil(Math.hypot(width, height)) + 2;
      stage.style.setProperty("--hero-cover", `${cover}px`);

      const stageBox = stage.getBoundingClientRect();

      // Beat 2 starts revealing once the circle (centered by then) covers
      // its whole headline block. Measure without the reveal's offset.
      const previous = beat2Copy.style.transform;
      beat2Copy.style.transform = "none";
      const headline = beat2Copy
        .querySelector(".home-hero-headline")!
        .getBoundingClientRect();
      // The notification stack's front card lines up with the line's top
      const lineTop = beat2Copy
        .querySelector(".home-hero-line")!
        .getBoundingClientRect().top;
      stage.style.setProperty("--notes-top", `${lineTop - stageBox.top}px`);
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
      // Its line types once the reveal is complete, and only once
      if (!beat2Typed && p >= BEAT_2_REVEALED) {
        beat2Typed = true;
        setBeat2Typing(true);
      }

    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    // Beat 3 reveals when its top reaches the header, i.e. once the
    // orange stage has scrolled fully behind the header. Until then beat 3
    // stays orange, continuous with the stage, so no orange band is left
    // above it. The observer watches a 2px line just under the header.
    let observer: IntersectionObserver | null = null;
    let lineTimer = 0;
    const watchBeat3 = () => {
      observer?.disconnect();
      if (beat3.hasAttribute("data-revealed")) return;
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          beat3.setAttribute("data-revealed", "");
          observer?.disconnect();
          lineTimer = window.setTimeout(
            () => setBeat3Typing(true),
            BEAT_3_LINE_DELAY_MS
          );
        },
        {
          rootMargin: `-${HEADER_PX}px 0px -${Math.max(
            0,
            window.innerHeight - HEADER_PX - 2
          )}px 0px`,
        }
      );
      observer.observe(beat3);
    };

    const onResize = () => {
      measure();
      schedule();
      watchBeat3();
    };

    measure();
    update();
    watchBeat3();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    // Web font swaps change text boxes; remeasure once they settle
    document.fonts?.ready.then(() => {
      measure();
      schedule();
    });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      observer?.disconnect();
      window.clearTimeout(lineTimer);
      circle.style.removeProperty("transform");
      beat2.style.removeProperty("clip-path");
      beat2Copy.style.removeProperty("opacity");
      beat2Copy.style.removeProperty("transform");
      stage.style.removeProperty("--hero-cover");
      stage.style.removeProperty("--notes-top");
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
              <HeroSearchMock
                animate={motion}
                play={typing}
                onDone={onSearchDone}
              />
            </div>
            <ScrollCue shown={cueShown} gone={cueGone} />
          </section>

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
              <TypedLine
                text={BEAT_2_LINE}
                animate={motion}
                play={beat2Typing}
                onProgress={onBeat2Typed}
                className="home-hero-line"
              />
            </div>
            <HeroNotificationStack count={notesIn} />
          </section>
        </div>
      </div>

      <section ref={beat3Ref} className="home-hero-beat home-hero-beat-3">
        <div className="home-hero-copy">
          <h2 className="home-hero-headline">
            <RisingLine text="Your business first." start={0} trailingSpace>
              <BeatThreeArc />
            </RisingLine>
            <RisingLine text="Then the AI." start={3} />
          </h2>
          <TypedLine
            text={BEAT_3_LINE}
            animate={motion}
            play={beat3Typing}
            className="home-hero-line home-hero-lede"
          />
        </div>
        <div className="home-hero-aside home-hero-cta">
          <BookCallCircle />
        </div>
      </section>
    </div>
  );
}

// Beat 3's connector arc, overlaid on the headline so it adds no space.
// It sits inside line 1, whose box ends where "first." ends, so it can
// start just past the period. Coordinates are in hundredths of an em from
// line 1's top left, so the SVG scales uniformly with the headline.
//  - From 990px (line 2 indented 2.5em): through the gap between the
//    lines, then hooking down into the space left of "Then", ending just
//    before the T.
//  - Phones (lines aligned): through the gap, ending at the T's top-left
//    corner, never past the text block's left edge.
// Clear gap in Quattrocento Sans at line-height 1.05: line 1 ends 0.834em
// down; line 2's tallest letter starts 1.132em down, its capitals 1.212em.
function BeatThreeArc() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="home-hero-arc"
      viewBox="0 0 785 70"
      preserveAspectRatio="none"
    >
      <path
        className="home-hero-arc-indented"
        d="M 783 9 C 560 11, 380 14, 300 22 C 258 26, 236 38, 233 62"
        pathLength={1}
        fill="none"
        strokeLinecap="round"
      />
      <path
        className="home-hero-arc-aligned"
        d="M 784 11 C 520 14, 260 21, 150 25 C 80 28, 30 30, 4 30"
        pathLength={1}
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

// One hand-set headline line, split into words for the masked rise.
// `start` continues the 35ms stagger across lines.
function RisingLine({
  text,
  start,
  trailingSpace = false,
  children,
}: {
  text: string;
  start: number;
  trailingSpace?: boolean;
  children?: ReactNode;
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
      {children}
    </span>
  );
}
