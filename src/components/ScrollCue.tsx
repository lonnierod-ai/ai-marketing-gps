type ScrollCueProps = {
  // Fade in (beat 1 has finished its opening moves)
  shown: boolean;
  // Fade out for good (the visitor has started scrolling)
  gone: boolean;
};

// Beat 1's decorative "Scroll" cue: a small label over a bouncing chevron.
export default function ScrollCue({ shown, gone }: ScrollCueProps) {
  return (
    <div
      aria-hidden="true"
      className="scroll-cue"
      data-shown={shown && !gone ? "" : undefined}
    >
      <span className="scroll-cue-label">Scroll</span>
      <svg
        className="scroll-cue-chevron"
        viewBox="0 0 24 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 3l8 6 8-6" />
      </svg>
    </div>
  );
}
