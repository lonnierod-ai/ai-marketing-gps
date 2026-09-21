export type NavItem = {
  label: string;
  href: string;
  // Other path prefixes that should mark this item as active
  matches?: string[];
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Services", href: "/services" },
  {
    label: "Resources",
    href: "/resources",
    matches: ["/tools", "/tool", "/goals", "/goal", "/search"],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// Points at the contact page until the booking tool is chosen
// (spec section 10, item 14)
export const BOOK_CALL_HREF = "/contact";

// Placeholder until the real profile URL is supplied
export const LINKEDIN_HREF = "#";

export const LOCATION = "Chicago, IL";

function matchesPath(pathname: string, prefix: string) {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

export function isNavItemActive(item: NavItem, pathname: string) {
  return [item.href, ...(item.matches ?? [])].some((prefix) =>
    matchesPath(pathname, prefix)
  );
}
