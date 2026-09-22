"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import BookCallCircle from "@/components/BookCallCircle";
import {
  LINKEDIN_HREF,
  NAV_ITEMS,
  isNavItemActive,
  type NavItem,
} from "@/lib/navigation";

type SiteMenuPanelProps = {
  id: string;
  interactive: boolean;
  visible: boolean;
  pathname: string;
  onNavigate: () => void;
};

// Animation timing lives in globals.css ("Site menu"), keyed off the
// header's data-state. These custom properties feed its delays.
const delay = (d: string, y?: string) =>
  ({ "--d": d, ...(y ? { "--y": y } : {}) }) as CSSProperties;

// The orange block and the charcoal copy of the word wipe in together on
// hover and focus, so the text turns charcoal exactly where the block is.
function MenuLabel({ label }: { label: string }) {
  return (
    <span className="site-menu-label">
      <span aria-hidden="true" className="site-menu-block" />
      <span className="site-menu-mask">
        <span className="site-menu-rise">
          <span className="site-menu-word">
            {label}
            <span aria-hidden="true" className="site-menu-ink">
              {label}
            </span>
          </span>
        </span>
      </span>
    </span>
  );
}

function CurrentDot() {
  return <span aria-hidden="true" className="site-menu-dot" />;
}

export default function SiteMenuPanel({
  id,
  interactive,
  visible,
  pathname,
  onNavigate,
}: SiteMenuPanelProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  // Every time the menu opens, it starts collapsed
  useEffect(() => {
    if (!visible) setExpanded(null);
  }, [visible]);

  const renderItem = (item: NavItem, index: number) => {
    const active = isNavItemActive(item, pathname);
    const dimmed = expanded !== null && expanded !== item.href;
    const itemStyle = { "--i": index } as CSSProperties;

    if (item.children) {
      const isExpanded = expanded === item.href;
      const subId = `${id}-${item.label.toLowerCase()}`;
      return (
        <li key={item.href} className={dimmed ? "site-menu-dimmed" : undefined}>
          <button
            type="button"
            onClick={() => setExpanded(isExpanded ? null : item.href)}
            aria-expanded={isExpanded}
            aria-controls={subId}
            aria-current={active ? "true" : undefined}
            className="site-menu-item site-menu-link"
            style={itemStyle}
          >
            <MenuLabel label={item.label} />
            {active && <CurrentDot />}
          </button>
          <div
            id={subId}
            data-expanded={isExpanded}
            inert={!isExpanded}
            className="site-menu-sub"
          >
            {/* Side padding leaves room for the orange block's overhang */}
            <div className="-mx-2 min-h-0 overflow-hidden px-2">
              <ul className="flex flex-col pb-2 pt-1">
                {item.children.map((child, childIndex) => {
                  const childActive = isNavItemActive(child, pathname);
                  return (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        onClick={onNavigate}
                        aria-current={childActive ? "page" : undefined}
                        className="site-menu-item site-menu-sublink"
                        style={{ "--j": childIndex } as CSSProperties}
                      >
                        <MenuLabel label={child.label} />
                        {childActive && <CurrentDot />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </li>
      );
    }

    return (
      <li key={item.href} className={dimmed ? "site-menu-dimmed" : undefined}>
        <Link
          href={item.href}
          onClick={onNavigate}
          aria-current={active ? "page" : undefined}
          className="site-menu-item site-menu-link"
          style={itemStyle}
        >
          <MenuLabel label={item.label} />
          {active && <CurrentDot />}
        </Link>
      </li>
    );
  };

  return (
    <div
      id={id}
      inert={!interactive}
      className="site-menu-panel fixed inset-y-0 right-0 z-[1] w-full overflow-y-auto overscroll-contain bg-brand-cobalt text-brand-white min-[990px]:w-[min(50vw,760px)]"
    >
      {/* Below 990px the panel is full screen and shares the header bar's
          side padding, so the tagline sits under the wordmark as a lockup.
          From 990px it is a right-hand half panel with its own padding;
          the tagline lines up with the Close button, centered 36px down. */}
      <div className="site-menu-inner flex min-h-[100dvh] w-full flex-col justify-between gap-12 px-4 pb-10 pt-[54px] [container-type:inline-size] sm:px-6 min-[990px]:px-16 min-[990px]:pb-12 min-[990px]:pt-[23px]">
        {/* Sits directly under the header wordmark as one lockup. The
            period is an orange circle; screen readers get a real "." */}
        <p
          className="site-menu-fade site-menu-tagline"
          style={delay("0.68s", "-12px")}
        >
          AI, sorted
          <span aria-hidden="true" className="site-menu-period" />
          <span className="sr-only">.</span>
        </p>

        <div className="flex flex-col gap-12">
          <nav aria-label="Main">
            <ul className="flex flex-col">{NAV_ITEMS.map(renderItem)}</ul>
          </nav>

          <div className="site-menu-pop self-start">
            <BookCallCircle onClick={onNavigate} />
          </div>
        </div>

        <div>
          <a
            href={LINKEDIN_HREF}
            aria-label="LinkedIn"
            className="site-menu-fade -ml-2 inline-flex h-11 w-11 items-center justify-center text-brand-white hover:text-brand-white [@media(hover:hover)]:hover:text-brand-white/80"
            style={delay("0.8s", "14px")}
          >
            <svg
              aria-hidden="true"
              width="28"
              height="28"
              viewBox="0 0 18 18"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="0.69"
            >
              <path d="M12.523 5.83716C13.2256 5.77425 13.9204 5.82636 14.5894 6.03149V6.03247C15.6435 6.37056 16.2928 7.09389 16.5748 8.14771V8.14868C16.7248 8.7272 16.773 9.31063 16.8785 9.95532L16.8795 9.96118C16.8975 10.0606 16.9079 10.1631 16.9185 10.2893V16.8831H14.022C14.0223 15.4836 14.0282 14.0864 14.022 12.6858L14.0113 11.2571C14.011 10.886 13.971 10.5122 13.9078 10.1506L13.8375 9.79224C13.761 9.43645 13.613 9.1113 13.3736 8.85083C13.1317 8.58774 12.8116 8.40827 12.4224 8.32251L12.4185 8.32153L12.19 8.28345C12.037 8.26427 11.8831 8.25731 11.73 8.26001L11.5015 8.27075C10.9986 8.30831 10.5548 8.464 10.2047 8.7561C9.85316 9.0494 9.6227 9.45819 9.50934 9.95532V9.95728C9.39316 10.4801 9.33481 11.0356 9.33453 11.5676C9.31371 13.3584 9.3217 15.1407 9.32281 16.926C8.37363 16.9188 7.41182 16.9163 6.44977 16.9163V6.10474H9.19098V8.24146L9.79938 7.52075C10.0645 7.20739 10.2456 6.95483 10.483 6.72778C10.9801 6.25729 11.5695 5.98333 12.2339 5.87427L12.523 5.83716Z" />
              <path d="M3.5175 6.104V16.9155H0.632736V6.104H3.5175Z" />
              <path d="M2.10547 0.345703C3.06224 0.373859 3.81413 1.15251 3.7959 2.08594C3.77729 3.07221 2.97987 3.83413 2.02539 3.80664H2.02246C1.10984 3.78839 0.327236 2.97556 0.345703 2.0332C0.364056 1.0972 1.16655 0.328815 2.10547 0.345703Z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
