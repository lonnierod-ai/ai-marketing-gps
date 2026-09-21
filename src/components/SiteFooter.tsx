import Image from "next/image";
import Link from "next/link";

const FOOTER_GROUPS = [
  {
    heading: "Services",
    links: [{ label: "Services", href: "/services" }],
  },
  {
    heading: "Resources",
    links: [
      { label: "Resources", href: "/resources" },
      { label: "AI tool directory", href: "/tools" },
      { label: "Marketing goals", href: "/goals" },
    ],
  },
  {
    heading: "About",
    links: [{ label: "About Lonnie", href: "/about" }],
  },
  {
    heading: "Contact",
    links: [{ label: "Contact", href: "/contact" }],
  },
];

// White focus ring: the site-wide cobalt ring would be invisible on cobalt
const footerLink =
  "text-brand-white hover:text-brand-white hover:underline focus-visible:outline-brand-white";

export default function SiteFooter() {
  return (
    <footer className="bg-brand-cobalt text-brand-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 min-[990px]:grid-cols-[1fr_2fr]">
          <Link href="/" className={`inline-block self-start ${footerLink}`}>
            <Image
              src="/brand/logo-inverse-2026-09-18.svg"
              alt="Aithello. AI, sorted."
              width={778}
              height={246}
              className="h-20 w-auto"
            />
          </Link>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
              {FOOTER_GROUPS.map((group) => (
                <li key={group.heading}>
                  <p className="text-base font-bold uppercase tracking-[0.05rem]">
                    {group.heading}
                  </p>
                  <ul className="mt-4 space-y-3">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className={footerLink}>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-14 border-t border-brand-white/25 pt-6 text-base">
          © 2026 L Rod Ventures LLC d/b/a Aithello
        </p>
      </div>
    </footer>
  );
}
