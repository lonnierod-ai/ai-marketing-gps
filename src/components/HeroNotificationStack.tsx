import type { CSSProperties, ReactNode } from "react";

// Simple white line icons (24px grid), no brand logos
const ICONS: Record<string, ReactNode> = {
  sparkle: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />,
  puzzle: (
    <path d="M9 4h2.5a1.75 1.75 0 1 1 3.5 0H18v3.5a1.75 1.75 0 1 1 0 3.5V15h-3a1.75 1.75 0 1 0-3.5 0H9v-3.5a1.75 1.75 0 1 1 0-3.5z" />
  ),
  cap: (
    <>
      <path d="M2 9l10-5 10 5-10 5z" />
      <path d="M6 11v4.5c0 1.4 2.7 3 6 3s6-1.6 6-3V11" />
      <path d="M22 9v5" />
    </>
  ),
  video: (
    <>
      <rect x="3" y="7" width="12" height="10" rx="2" />
      <path d="M15 10.5l6-3v9l-6-3" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  list: <path d="M9 6.5h11M9 12h11M9 17.5h11M4.5 6.5h.01M4.5 12h.01M4.5 17.5h.01" />,
  trending: (
    <>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </>
  ),
};

// In arrival order
export const NOTIFICATIONS = [
  { icon: "sparkle", title: "New AI app", pitch: "Launched today. Try it free." },
  { icon: "puzzle", title: "Must-try plugin", pitch: "Everyone's using it." },
  { icon: "cap", title: "AI masterclass", pitch: "Seats filling fast." },
  { icon: "video", title: "Free webinar", pitch: "Starts in 10 minutes." },
  { icon: "calendar", title: "Book a demo", pitch: "Only 15 minutes." },
  { icon: "clock", title: "Free trial", pitch: "Ends in 3 days." },
  { icon: "list", title: "Top 50 AI tools", pitch: "Updated this week." },
  { icon: "trending", title: "10x your output", pitch: "Sponsored." },
];

type HeroNotificationStackProps = {
  // How many notifications have landed, in order
  count: number;
  // How many fit on the stage; older ones beyond this never show
  max: number;
};

/**
 * Beat 2's decorative notification list: frosted cards in one column,
 * newest on top. Every card has a fixed slot; HomeHero lands them in
 * arrival order (the oldest at the bottom first, the newest last at the
 * top), each sliding down into its own slot, so nothing shifts or
 * overlaps. A "N new" counter sits above. HomeHero also sets the
 * position and spacing. Styles and motion live in globals.css
 * ("Home hero").
 */
export default function HeroNotificationStack({ count, max }: HeroNotificationStackProps) {
  const total = NOTIFICATIONS.length;
  return (
    <div aria-hidden="true" className="hero-notes">
      <p className="hero-notes-count" data-shown={count > 0 ? "" : undefined}>
        {count} new
      </p>
      {NOTIFICATIONS.map((note, index) => {
        // 0 is the top slot, for the newest card
        const slot = total - 1 - index;
        const state = slot >= max ? "out" : index < count ? "in" : "waiting";
        return (
          <div
            key={note.title}
            className="hero-note"
            data-state={state}
            style={{ "--slot": slot } as CSSProperties}
          >
            <span className="hero-note-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {ICONS[note.icon]}
              </svg>
            </span>
            <span className="hero-note-text">
              <span className="hero-note-title">{note.title}</span>
              <span className="hero-note-pitch">{note.pitch}</span>
            </span>
          </div>
        );
      })}
    </div>
  );
}
