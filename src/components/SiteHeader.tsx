"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BOOK_CALL_HREF, NAV_ITEMS, isNavItemActive } from "@/lib/navigation";

const DESKTOP_QUERY = "(min-width: 990px)";

const navLinkBase =
  "text-base uppercase tracking-[0.05rem] transition-colors";
const navLinkIdle = "font-normal text-brand-charcoal hover:text-brand-cobalt";
const navLinkActive =
  "font-bold text-brand-cobalt hover:text-brand-cobalt underline decoration-brand-orange decoration-[3px] underline-offset-[10px]";

const bookCallClasses =
  "inline-flex items-center justify-center rounded-full bg-brand-orange px-6 py-2.5 text-base font-bold text-brand-charcoal transition-colors hover:bg-brand-orange-hover hover:text-brand-charcoal";

export default function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close the menu whenever the page changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onResize = () => {
      if (desktop.matches) setMenuOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onResize);
    panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onResize);
    };
  }, [menuOpen]);

  return (
    // While the menu is open, sit above the chat widget (z-index 9999)
    <header
      className={`sticky top-0 border-b border-rule bg-brand-ground ${menuOpen ? "z-[10000]" : "z-40"}`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-brand-white focus:px-4 focus:py-2 focus:text-base focus:font-bold focus:text-brand-cobalt"
      >
        Skip to content
      </a>

      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0">
          <Image
            src="/brand/logo-primary-wordmark-2026-09-18.svg"
            alt="Aithello"
            width={778}
            height={153}
            priority
            className="h-8 w-auto min-[990px]:h-9"
          />
        </Link>

        <nav
          aria-label="Main"
          className="hidden items-center gap-10 min-[990px]:flex"
        >
          <ul className="flex items-center gap-8">
            {NAV_ITEMS.map((item) => {
              const active = isNavItemActive(item, pathname);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`${navLinkBase} ${active ? navLinkActive : navLinkIdle}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <a href={BOOK_CALL_HREF} className={bookCallClasses}>
            Book a call
          </a>
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-md text-brand-charcoal min-[990px]:hidden"
        >
          <svg
            aria-hidden="true"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!menuOpen}
        className="absolute inset-x-0 top-full h-[calc(100dvh-72px)] overflow-y-auto border-b border-rule bg-brand-ground min-[990px]:hidden"
      >
        <nav aria-label="Main" className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <ul className="flex flex-col">
            {NAV_ITEMS.map((item) => {
              const active = isNavItemActive(item, pathname);
              return (
                <li key={item.href} className="border-b border-rule">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={`block py-4 ${navLinkBase} ${active ? navLinkActive : navLinkIdle}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <a
            href={BOOK_CALL_HREF}
            onClick={() => setMenuOpen(false)}
            className={`mt-8 w-full ${bookCallClasses}`}
          >
            Book a call
          </a>
        </nav>
      </div>
    </header>
  );
}
