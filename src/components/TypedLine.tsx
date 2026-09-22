"use client";

import { useEffect, useState } from "react";

// About 12ms a character with a little unevenness, the same every time
const charDelay = (index: number) => 12 + ((index * 37) % 9) - 4;

type TypedLineProps = {
  text: string;
  // false: show the text as is (phones, reduced motion)
  animate: boolean;
  // Start typing; once started it runs to the end and never retypes
  play: boolean;
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
  className = "",
}: TypedLineProps) {
  const [typed, setTyped] = useState(0);
  const done = typed >= text.length;

  useEffect(() => {
    if (!animate || !play) return;
    const timers: number[] = [];
    let at = 0;
    for (let i = 1; i <= text.length; i++) {
      at += charDelay(i);
      timers.push(window.setTimeout(() => setTyped(i), at));
    }
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [animate, play, text]);

  const typing = animate && !done;

  return (
    <p className={`typed-line ${className}`}>
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
