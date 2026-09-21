"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SiteMenuPanel from "@/components/SiteMenuPanel";
import { useFocusTrap } from "@/lib/useFocusTrap";

type MenuState = "closed" | "opening" | "open" | "closing";

const MENU_ID = "site-menu";

// Must match the "Site menu" rules in globals.css
const MOTION_QUERY =
  "(min-width: 990px) and (prefers-reduced-motion: no-preference)";
const TIMINGS = {
  motion: { open: 1000, close: 800 },
  fade: { open: 200, close: 200 },
};

function currentTimings() {
  return window.matchMedia(MOTION_QUERY).matches
    ? TIMINGS.motion
    : TIMINGS.fade;
}

export default function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [state, setState] = useState<MenuState>("closed");
  const stateRef = useRef<MenuState>("closed");
  const timerRef = useRef<number | undefined>(undefined);
  const headerRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const previousPathname = useRef(pathname);

  const isOpen = state === "opening" || state === "open";
  const isShown = state !== "closed";

  const moveTo = useCallback((next: MenuState, after?: MenuState, ms = 0) => {
    window.clearTimeout(timerRef.current);
    stateRef.current = next;
    setState(next);
    if (after) {
      timerRef.current = window.setTimeout(() => {
        stateRef.current = after;
        setState(after);
      }, ms);
    }
  }, []);

  const openMenu = useCallback(() => {
    moveTo("opening", "open", currentTimings().open);
  }, [moveTo]);

  const closeMenu = useCallback(() => {
    const current = stateRef.current;
    if (current === "closed" || current === "closing") return;
    moveTo("closing", "closed", currentTimings().close);
  }, [moveTo]);

  // The button ignores clicks mid-animation; Escape and links always close
  const onToggle = () => {
    if (stateRef.current === "closed") openMenu();
    else if (stateRef.current === "open") closeMenu();
  };

  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    closeMenu();
  }, [pathname, closeMenu]);

  // Lock page scroll, and flag the page so globals.css can hide the chat
  // widget while any part of the menu is on screen
  useEffect(() => {
    if (!isShown) return;
    const root = document.documentElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    root.dataset.siteMenu = "open";
    return () => {
      document.body.style.overflow = previousOverflow;
      delete root.dataset.siteMenu;
    };
  }, [isShown]);

  const onEscape = useCallback(() => {
    closeMenu();
    buttonRef.current?.focus();
  }, [closeMenu]);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  // A button focused by keyboard keeps its focus ring when later clicked.
  // Mark pointer presses so globals.css can hide the ring until the next
  // key press.
  useEffect(() => {
    const clearPointerMark = () => {
      delete buttonRef.current?.dataset.pointer;
    };
    document.addEventListener("keydown", clearPointerMark, true);
    return () => document.removeEventListener("keydown", clearPointerMark, true);
  }, []);

  // Focus is left on the button when the menu opens. Keyboard users are
  // already there; moving it in code would make Safari draw the keyboard
  // focus ring after a mouse click.
  useFocusTrap({
    active: isOpen,
    containerRef: headerRef,
    moveFocusOnOpen: false,
    onEscape,
  });

  return (
    <header
      ref={headerRef}
      data-state={state}
      className={`site-header sticky top-0 ${isShown ? "z-menu-open" : "z-header"}`}
    >
      {/* The ground bar sits under the panel so the wipe covers it */}
      <div
        aria-hidden="true"
        className="absolute inset-0 border-b border-rule bg-brand-ground"
      />

      <a
        href="#main-content"
        tabIndex={isShown ? -1 : undefined}
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[3] focus:rounded-md focus:bg-brand-white focus:px-4 focus:py-2 focus:text-base focus:font-bold focus:text-brand-cobalt"
      >
        Skip to content
      </a>

      <div className="site-header-bar relative z-[2] mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          onClick={closeMenu}
          className="relative block shrink-0"
        >
          <Image
            src="/brand/logo-primary-wordmark-2026-09-18.svg"
            alt="Aithello"
            width={778}
            height={153}
            priority
            className="site-logo-primary h-8 w-auto min-[990px]:h-9"
          />
          <Image
            src="/brand/logo-inverse-wordmark-2026-09-18.svg"
            alt=""
            width={778}
            height={153}
            priority
            className="site-logo-inverse absolute left-0 top-0 h-8 w-auto min-[990px]:h-9"
          />
        </Link>

        <button
          ref={buttonRef}
          type="button"
          onClick={onToggle}
          onPointerDown={(event) => {
            event.currentTarget.dataset.pointer = "true";
          }}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls={MENU_ID}
          className="site-menu-toggle -mr-2 inline-flex h-11 items-center gap-3 rounded-md px-2"
        >
          <span
            aria-hidden="true"
            className="site-menu-toggle-label text-base uppercase tracking-[0.05rem]"
          >
            {isOpen ? "Close" : "Menu"}
          </span>
          <span aria-hidden="true" className="relative block h-4 w-6">
            <span className="site-menu-line" />
            <span className="site-menu-line" />
            <span className="site-menu-line" />
          </span>
        </button>
      </div>

      {/* After the bar in tab order; z-[1] keeps it under the bar */}
      <SiteMenuPanel
        id={MENU_ID}
        interactive={isOpen}
        visible={isShown}
        pathname={pathname}
        onNavigate={closeMenu}
      />
    </header>
  );
}
