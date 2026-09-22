"use client";

import { useEffect, useRef, useState } from "react";

const QUERY = "Summarize our Q3 numbers for the board.";
const ANSWER =
  "Here's a summary of your Q3 numbers: revenue changed, costs changed, and there are several factors to consider.";

const START_DELAY_MS = 1000;
const PAUSE_MS = 700;

// About 45ms a key with a little unevenness, the same every time
const keyDelay = (index: number) => 45 + ((index * 37) % 23) - 11;

type HeroSearchMockProps = {
  // false: show the finished state (phones, reduced motion)
  animate: boolean;
  // Start typing (after the intro, once the bar is on screen)
  play: boolean;
};

/**
 * Beat 1's decorative search bar. Types a question, pauses, then shows a
 * bland answer. Not a real input: aria-hidden, nothing focusable.
 */
export default function HeroSearchMock({ animate, play }: HeroSearchMockProps) {
  const [typed, setTyped] = useState(0);
  const [answered, setAnswered] = useState(false);
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animate || !play) return;
    const timers: number[] = [];
    let at = START_DELAY_MS;
    for (let i = 1; i <= QUERY.length; i++) {
      at += keyDelay(i);
      timers.push(window.setTimeout(() => setTyped(i), at));
    }
    timers.push(window.setTimeout(() => setAnswered(true), at + PAUSE_MS));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [animate, play]);

  // Narrow fields: keep the newest characters in view, like a real input
  useEffect(() => {
    const field = fieldRef.current;
    if (field) field.scrollLeft = field.scrollWidth;
  }, [typed]);

  const done = !animate || answered;
  const query = animate ? QUERY.slice(0, typed) : QUERY;

  return (
    <div
      aria-hidden="true"
      className="hero-search"
      data-mode={animate ? "animate" : "final"}
      data-answered={done ? "" : undefined}
    >
      <div className="hero-search-field">
        <svg
          className="hero-search-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <div ref={fieldRef} className="hero-search-query">
          {query}
          {!done && <span className="hero-search-caret" />}
        </div>
      </div>
      <p className="hero-search-answer">{ANSWER}</p>
    </div>
  );
}
