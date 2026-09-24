"use client";

import { useEffect, useRef, useState } from "react";

// About `base` ms a character with a little unevenness, the same every time
const charDelay = (index: number, base: number) =>
  base + ((index * 37) % 9) - 4;

type TypedLineProps = {
  text: string;
  // false: show the text as is (phones, reduced motion)
  animate: boolean;
  // Start typing; once started it runs to the end and never retypes
  play: boolean;
  // Average milliseconds per character
  charMs?: number;
  // Called with the number of characters typed so far
  onProgress?: (typed: number) => void;
  // Called once the whole line has typed
  onDone?: () => void;
  id?: string;
  className?: string;
};

/**
 * A paragraph that types itself out once. The real text is in the page
 * from the start (for screen readers and search engines) and reserves the
 * paragraph's final space; while typing, it is invisible under an
 * aria-hidden copy whose untyped characters are transparent, so lines
 * wrap exactly as they will at the end and nothing shifts. No caret.
 */
export default function TypedLine({
  text,
  animate,
  play,
  charMs = 12,
  onProgress,
  onDone,
  id,
  className = "",
}: TypedLineProps) {
  const [typed, setTyped] = useState(0);
  const typedRef = useRef(0);
  typedRef.current = typed;
  const done = typed >= text.length;

  useEffect(() => {
    if (typed > 0) onProgress?.(typed);
  }, [typed, onProgress]);

  useEffect(() => {
    if (done) onDone?.();
  }, [done, onDone]);

  useEffect(() => {
    // Never retype a finished line (for example after a resize)
    if (!animate || !play || typedRef.current >= text.length) return;
    const timers: number[] = [];
    let at = 0;
    for (let i = 1; i <= text.length; i++) {
      at += charDelay(i, charMs);
      timers.push(window.setTimeout(() => setTyped(i), at));
    }
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [animate, play, text, charMs]);

  const typing = animate && !done;

  return (
    <p id={id} className={`typed-line ${className}`}>
      <span className="typed-line-real" data-hidden={typing ? "" : undefined}>
        {text}
      </span>
      {typing && (
        <span aria-hidden="true" className="typed-line-copy">
          {text.slice(0, typed)}
          <span className="typed-line-rest">{text.slice(typed)}</span>
        </span>
      )}
    </p>
  );
}
