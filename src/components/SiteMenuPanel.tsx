"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import BookCallCircle from "@/components/BookCallCircle";
import {
  LINKEDIN_HREF,
  LOCATION,
  NAV_ITEMS,
  isNavItemActive,
} from "@/lib/navigation";

type SiteMenuPanelProps = {
  id: string;
  interactive: boolean;
  pathname: string;
  onNavigate: () => void;
};

// Animation timing lives in globals.css ("Site menu"), keyed off the
// header's data-state. These custom properties feed its delays.
const delay = (d: string, y?: string) =>
  ({ "--d": d, ...(y ? { "--y": y } : {}) }) as CSSProperties;

export default function SiteMenuPanel({
  id,
  interactive,
  pathname,
  onNavigate,
}: SiteMenuPanelProps) {
  return (
    <div
      id={id}
      inert={!interactive}
      className="site-menu-panel fixed inset-0 z-[1] overflow-y-auto overscroll-contain bg-brand-cobalt text-brand-white"
    >
      <div className="site-menu-inner flex min-h-[100dvh] flex-col justify-between gap-12 px-6 pb-10 pt-28 [container-type:inline-size] min-[990px]:px-28 min-[990px]:pb-12">
        <p className="site-menu-fade" style={delay("0.68s", "-12px")}>
          AI, sorted.
        </p>

        <div className="flex flex-col gap-12 min-[990px]:flex-row min-[990px]:items-center min-[990px]:justify-between">
          <nav aria-label="Main">
            <ul className="flex flex-col">
              {NAV_ITEMS.map((item, index) => {
                const active = isNavItemActive(item, pathname);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                      className="site-menu-link inline-flex items-center text-brand-white hover:text-brand-white"
                      style={{ "--i": index } as CSSProperties}
                    >
                      <span className="site-menu-mask">
                        <span className="site-menu-rise">
                          <span className="site-menu-swap">{item.label}</span>
                        </span>
                      </span>
                      {active && (
                        <span aria-hidden="true" className="site-menu-dot" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="site-menu-pop self-start min-[990px]:self-center">
            <BookCallCircle onClick={onNavigate} />
          </div>
        </div>

        <div className="flex items-end justify-between gap-6">
          <a
            href={LINKEDIN_HREF}
            className="site-menu-fade inline-flex items-center gap-2 text-base text-brand-white hover:text-brand-white hover:underline"
            style={delay("0.8s", "14px")}
          >
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="0.69"
            >
              <path d="M12.523 5.83716C13.2256 5.77425 13.9204 5.82636 14.5894 6.03149V6.03247C15.6435 6.37056 16.2928 7.09389 16.5748 8.14771V8.14868C16.7248 8.7272 16.773 9.31063 16.8785 9.95532L16.8795 9.96118C16.8975 10.0606 16.9079 10.1631 16.9185 10.2893V16.8831H14.022C14.0223 15.4836 14.0282 14.0864 14.022 12.6858L14.0113 11.2571C14.011 10.886 13.971 10.5122 13.9078 10.1506L13.8375 9.79224C13.761 9.43645 13.613 9.1113 13.3736 8.85083C13.1317 8.58774 12.8116 8.40827 12.4224 8.32251L12.4185 8.32153L12.19 8.28345C12.037 8.26427 11.8831 8.25731 11.73 8.26001L11.5015 8.27075C10.9986 8.30831 10.5548 8.464 10.2047 8.7561C9.85316 9.0494 9.6227 9.45819 9.50934 9.95532V9.95728C9.39316 10.4801 9.33481 11.0356 9.33453 11.5676C9.31371 13.3584 9.3217 15.1407 9.32281 16.926C8.37363 16.9188 7.41182 16.9163 6.44977 16.9163V6.10474H9.19098V8.24146L9.79938 7.52075C10.0645 7.20739 10.2456 6.95483 10.483 6.72778C10.9801 6.25729 11.5695 5.98333 12.2339 5.87427L12.523 5.83716Z" />
              <path d="M3.5175 6.104V16.9155H0.632736V6.104H3.5175Z" />
              <path d="M2.10547 0.345703C3.06224 0.373859 3.81413 1.15251 3.7959 2.08594C3.77729 3.07221 2.97987 3.83413 2.02539 3.80664H2.02246C1.10984 3.78839 0.327236 2.97556 0.345703 2.0332C0.364056 1.0972 1.16655 0.328815 2.10547 0.345703Z" />
            </svg>
            LinkedIn
          </a>
          <span className="site-menu-fade text-base" style={delay("0.85s", "10px")}>
            {LOCATION}
          </span>
        </div>
      </div>
    </div>
  );
}
