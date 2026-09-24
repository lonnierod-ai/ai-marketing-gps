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
//   0.00-0.16  hold on beat 1 (the search bar types, on a timer)
//   0.16-0.36  the circle rises
//   0.36-0.68  the circle expands; beat 2 starts revealing once the
//              circle covers its headline block
//   0.68-0.72  beat 2 finishes its reveal; its line then types and its
//              notifications cascade in (both on a timer)
//   0.72-1.00  hold on beat 2
const RISE_START = 0.16;
const RISE_END = 0.36;
const EXPAND_END = 0.68;
const BEAT_2_REVEALED = 0.72;

// If the intro never reports back, start beat 1 anyway
const INTRO_FALLBACK_MS = 6000;

const clamp = (v: number) => Math.min(1, Math.max(0, v));

// The reference's Power4 in-out, for the rise
const power4InOut = (p: number) =>
  p < 0.5 ? 8 * p ** 4 : 1 - (-2 * p + 2) ** 4 / 2;

// The reference's ease-in squared, for the expansion
const easeInSquared = (p: number) => p * p;

const easeOutCubic = (p: number) => 1 - (1 - p) ** 3;

// Beat 2's notifications cascade in this far apart, oldest first
const NOTE_STAGGER_MS = 80;

// Beat 2's notification list, fitted to the stage (see fitNotes)
const NOTE_WIDTH_PX = 320;
const NOTES_EDGE_PX = 64; // the stage's 4rem side padding
const NOTES_CLEAR_PX = 32; // clear space beside the copy
const NOTES_MARGIN_PX = 24; // clear space above and below the list
const NOTES_BELOW_PX = 24; // clear space under the headline line above it
const NOTES_ROOMY = { gap: 10, padY: 12 };
const NOTES_TIGHT = { gap: 6, padY: 8 };
// If tighter spacing is not enough: the newest 6, then fewer
const NOTES_FALLBACK = 6;
const NOTES_FEWEST = 3;

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
const BEAT_3_LINE =
  "I learn how your business actually runs, get you fluent on your own work, and build what's missing. That's Aithello.";

/**
 * Homepage hero, three beats in an editorial layout. From 990px without
 * reduced motion, beat 1 is pinned while an orange circle rises and
 * expands to reveal beat 2, whose line types while outside-marketing
 * notifications arrive beside it as the visitor scrolls; beat 3 reveals
 * when it reaches the header.
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

  // Beat 2's notifications: how many have landed, and how many fit on the
  // stage. They play once per page load, as a timed cascade when beat 2's
  // reveal completes, and stay when scrolling back up.
  const [notesIn, setNotesIn] = useState(0);
  const [notesMax, setNotesMax] = useState(NOTIFICATIONS.length);
  const notesMaxRef = useRef(NOTIFICATIONS.length);
  const notesPlayed = useRef(false);
  const noteTimers = useRef<number[]>([]);
  const playNotes = useCallback((animate: boolean) => {
    if (notesPlayed.current) return;
    notesPlayed.current = true;
    const total = NOTIFICATIONS.length;
    if (!animate) {
      setNotesIn(total);
      return;
    }
    // Older cards that don't fit the stage never show; start past them
    const first = total - Math.min(notesMaxRef.current, total) + 1;
    for (let n = first; n <= total; n++) {
      noteTimers.current.push(
        window.setTimeout(() => setNotesIn(n), (n - first) * NOTE_STAGGER_MS)
      );
    }
  }, []);
  useEffect(() => {
    const timers = noteTimers.current;
    return () => timers.forEach((timer) => window.clearTimeout(timer));
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
    const notes = beat2?.querySelector<HTMLElement>(".hero-notes");
    if (
      !notes ||
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

    // Places beat 2's notification list and decides how many cards fit.
    // Where the column clears the copy beside it, the list is centered
    // on the stage; otherwise it starts under the headline's second line,
    // or under the lowest line it would overlap if that is lower. To fit, spacing tightens first, then fewer cards show.
    const fitNotes = (stageBox: DOMRect) => {
      const listLeft = width - NOTES_EDGE_PX - NOTE_WIDTH_PX;
      // The text itself, line by line (the headline lines are blocks as
      // wide as the copy, so measure their contents)
      const range = document.createRange();
      const boxes = [
        ...beat2Copy.querySelectorAll(".home-hero-hl, .typed-line-real"),
      ].flatMap((el) => {
        range.selectNodeContents(el);
        return Array.from(range.getClientRects());
      });
      let floor = 0;
      for (const box of boxes) {
        if (box.right - stageBox.left > listLeft - NOTES_CLEAR_PX) {
          floor = Math.max(floor, box.bottom - stageBox.top + NOTES_BELOW_PX);
        }
      }
      const centered = floor === 0;
      // Beside the copy, the list never starts above the headline's
      // second line's bottom
      if (!centered) {
        const second = beat2Copy.querySelectorAll(".home-hero-hl")[1];
        range.selectNodeContents(second);
        const lines = Array.from(range.getClientRects());
        const bottom = Math.max(...lines.map((line) => line.bottom));
        floor = Math.max(floor, bottom - stageBox.top + NOTES_BELOW_PX);
      }
      const top = centered ? NOTES_MARGIN_PX : floor;
      const room = height - NOTES_MARGIN_PX - top;

      const card = notes.querySelector<HTMLElement>(".hero-note")!;
      const cardHeight = (padY: number) => {
        notes.style.setProperty("--notes-pad-y", `${padY}px`);
        return card.offsetHeight;
      };
      const listHeight = (n: number, h: number, gap: number) =>
        n * h + (n - 1) * gap;

      let spacing = NOTES_ROOMY;
      let h = cardHeight(spacing.padY);
      let max = NOTIFICATIONS.length;
      if (listHeight(max, h, spacing.gap) > room) {
        spacing = NOTES_TIGHT;
        h = cardHeight(spacing.padY);
        if (listHeight(max, h, spacing.gap) > room) max = NOTES_FALLBACK;
        while (max > NOTES_FEWEST && listHeight(max, h, spacing.gap) > room) {
          max -= 1;
        }
      }
      const block = listHeight(max, h, spacing.gap);
      const listTop = centered ? (height - block) / 2 : top;
      notes.style.setProperty("--notes-top", `${listTop}px`);
      notes.style.setProperty("--notes-pitch", `${h + spacing.gap}px`);
      notesMaxRef.current = max;
      setNotesMax(max);
    };

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
      fitNotes(stageBox);
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
      const distance = track.offsetHeight - height;
      const p = clamp((HEADER_PX - rect.top) / distance);

      // Beat 2's notifications cascade in once its reveal completes. If
      // the page loads with the hero already scrolled past, they are
      // simply there.
      if (p >= BEAT_2_REVEALED) playNotes(rect.bottom > HEADER_PX);

      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

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
      for (const name of ["--notes-top", "--notes-pad-y", "--notes-pitch"]) {
        notes.style.removeProperty(name);
      }
    };
  }, [motion, playNotes]);

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
                className="home-hero-line"
              />
            </div>
            <HeroNotificationStack count={notesIn} max={notesMax} />
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
