"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import SecondaryButton from "@/components/SecondaryButton";
import TypedLine from "@/components/TypedLine";
import { BOOK_CALL_HREF } from "@/lib/navigation";
import { AUDIT, OFFER_GROUPS, offerHref, type Offer } from "@/lib/offers";

// Must match the "How I can help" gate in globals.css
const MOTION_QUERY =
  "(min-width: 990px) and (prefers-reduced-motion: no-preference)";

// Must match the card flip gate in globals.css: a wide screen that can
// hover, with reduced motion off
const FLIP_QUERY =
  "(min-width: 990px) and (hover: hover) and (prefers-reduced-motion: no-preference)";

// Revealed blocks and cards play this far apart
const REVEAL_STEP_MS = 80;

// The back face's description starts typing this far into the 500ms flip
// (about 60% through), at about this many ms a character
const TYPE_AFTER_MS = 300;
const TYPE_CHAR_MS = 10;

const HEADING = "How I can help.";

// The wall behind each card's back face: cobalt with white text, or
// orange with charcoal text (white on orange fails contrast)
type Wall = "cobalt" | "orange";
const GROUP_WALLS: Record<string, Wall> = {
  "Done for you": "cobalt",
  "Done with you": "orange",
};

/**
 * Homepage "How I can help" (spec section 8): the Audit as the starting
 * point, then the four offers in two groups, each card linking to its
 * section on /services. From 990px without reduced motion, the heading,
 * the Audit card, and each group reveal once as they come into view.
 * Where the cards can flip (see FLIP_QUERY), each shows its name and
 * flips on hover or keyboard focus to a cobalt back face whose
 * description types out once. Elsewhere each card is a solid cobalt card
 * with everything shown. Styles in globals.css ("How I can help").
 */
export default function HowICanHelp() {
  const sectionRef = useRef<HTMLElement>(null);

  // Whether the cards flip (and type) here
  const [flip, setFlip] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(FLIP_QUERY);
    const sync = () => setFlip(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !window.matchMedia(MOTION_QUERY).matches) return;

    const blocks = Array.from(
      section.querySelectorAll<HTMLElement>("[data-reveal-block]")
    );
    // Top 85% of the viewport (spec section 7 trigger)
    const inView = (block: HTMLElement) =>
      block.getBoundingClientRect().top < window.innerHeight * 0.85;

    // Blocks already in view or scrolled past (a reload further down the
    // page) show as they are; the rest hide until they come into view
    const waiting = blocks.filter((block) => {
      if (!inView(block)) return true;
      block.setAttribute("data-revealed", "");
      return false;
    });
    if (!waiting.length) return;
    section.setAttribute("data-reveal", "");

    const observer = new IntersectionObserver(
      (entries) => {
        // Blocks entering together play in page order, a step apart; a
        // group's label comes in with its first card
        let step = 0;
        entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target as HTMLElement)
          .sort((a, b) => blocks.indexOf(a) - blocks.indexOf(b))
          .forEach((block) => {
            block.style.setProperty("--reveal-delay", `${step * REVEAL_STEP_MS}ms`);
            const items = block.querySelectorAll<HTMLElement>(".help-reveal");
            if (!items.length) step += 1;
            items.forEach((item) => {
              item.style.setProperty(
                "--reveal-delay",
                `${step * REVEAL_STEP_MS}ms`
              );
              if (!item.classList.contains("help-group-label")) step += 1;
            });
            block.setAttribute("data-revealed", "");
            observer.unobserve(block);
          });
      },
      { rootMargin: "0px 0px -15% 0px" }
    );
    waiting.forEach((block) => observer.observe(block));
    return () => observer.disconnect();
  }, []);

  const words = HEADING.split(" ");

  return (
    <section
      ref={sectionRef}
      aria-labelledby="how-i-can-help"
      className="help"
    >
      <div className="help-inner">
        <h2 id="how-i-can-help" className="help-heading" data-reveal-block="">
          {words.map((word, index) => (
            <span key={index}>
              <span className="help-mask">
                <span
                  className="help-word"
                  style={{ "--w": index } as CSSProperties}
                >
                  {word}
                </span>
              </span>
              {index < words.length - 1 ? " " : null}
            </span>
          ))}
        </h2>

        <div className="help-audit" data-reveal-block="">
          <div className="help-reveal">
            <OfferCard offer={AUDIT} tag="Start here" wall="cobalt" flip={flip} />
          </div>
        </div>

        {OFFER_GROUPS.map((group) => (
          <div key={group.label} className="help-group" data-reveal-block="">
            <p className="help-group-label help-reveal">{group.label}</p>
            <div className="help-grid">
              {group.offers.map((offer) => (
                <div key={offer.id} className="help-reveal">
                  <OfferCard
                    offer={offer}
                    wall={GROUP_WALLS[group.label] ?? "cobalt"}
                    flip={flip}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="help-closing">
          <p className="help-closing-line">
            Not sure which fits? That&apos;s what the discovery call is for.
          </p>
          <SecondaryButton href={BOOK_CALL_HREF}>
            Book a free discovery call
          </SecondaryButton>
        </div>
      </div>
    </section>
  );
}

// One offer card: a single link to the offer's section on /services.
// Named by its title, with the card copy as its description, so screen
// readers read it once as title plus description. Both faces stay in
// the page; the large front name is the real h3, and the back's small
// name and "See how it works" are decorative. The link holds the
// perspective and the focus ring and never rotates; the layer inside it
// flips.
function OfferCard({
  offer,
  tag,
  wall,
  flip,
}: {
  offer: Offer;
  tag?: string;
  wall: Wall;
  flip: boolean;
}) {
  const titleId = `offer-${offer.id}-title`;
  const bodyId = `offer-${offer.id}-body`;

  // The description types once per page load, starting partway into the
  // first flip. Leaving before then cancels the start; leaving after lets
  // it finish out of sight, so the next flip shows the whole back face.
  const [typing, setTyping] = useState(false);
  const [typed, setTyped] = useState(false);
  const startTimer = useRef(0);
  const startTyping = () => {
    if (!flip || typing) return;
    window.clearTimeout(startTimer.current);
    startTimer.current = window.setTimeout(() => setTyping(true), TYPE_AFTER_MS);
  };
  // Only cancel once the card is neither hovered nor keyboard-focused
  const cancelStart = (event: { currentTarget: HTMLElement }) => {
    const card = event.currentTarget;
    if (card.matches(":hover") || card.matches(":focus-visible")) return;
    window.clearTimeout(startTimer.current);
  };
  useEffect(() => () => window.clearTimeout(startTimer.current), []);
  const onTyped = useCallback(() => setTyped(true), []);

  return (
    <Link
      href={offerHref(offer)}
      className="help-card"
      data-wall={wall}
      data-typed={typed ? "" : undefined}
      aria-labelledby={titleId}
      aria-describedby={bodyId}
      onPointerEnter={startTyping}
      onPointerLeave={cancelStart}
      onFocus={startTyping}
      onBlur={cancelStart}
    >
      <div className="help-card-inner">
        <div className="help-card-face help-card-front">
          {tag && <span className="help-tag">{tag}</span>}
          <h3 id={titleId} className="help-card-title">
            {offer.title}
          </h3>
        </div>
        <div className="help-card-face help-card-back">
          <span aria-hidden="true" className="help-card-name">
            {offer.title}
          </span>
          <TypedLine
            id={bodyId}
            text={offer.card}
            animate={flip}
            play={typing}
            charMs={TYPE_CHAR_MS}
            onDone={onTyped}
            className="help-card-body"
          />
          <span aria-hidden="true" className="help-card-more">
            See how it works
            <svg
              className="help-card-arrow"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
