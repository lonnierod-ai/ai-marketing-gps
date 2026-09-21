"use client";

import { usePathname } from "next/navigation";
import BookCallCircle from "@/components/BookCallCircle";

// Closing band above the footer on every page except /contact, where the
// button would link to the page it sits on.
export default function ClosingCta() {
  const pathname = usePathname();
  if (pathname === "/contact") return null;

  return (
    <section
      aria-label="Book a discovery call"
      className="border-t border-rule bg-brand-ground"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 px-4 py-20 text-center sm:px-6 lg:px-8 min-[990px]:flex-row min-[990px]:justify-between min-[990px]:text-left">
        <p className="max-w-2xl text-[2rem] font-bold leading-[1.1] text-brand-cobalt">
          Not sure which fits? That&apos;s what the discovery call is for.
        </p>
        <BookCallCircle />
      </div>
    </section>
  );
}
