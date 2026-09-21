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
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

// Placeholder until the booking tool is chosen (spec section 10, item 14)
export const BOOK_CALL_HREF = "#book";

function matchesPath(pathname: string, prefix: string) {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

export function isNavItemActive(item: NavItem, pathname: string) {
  return [item.href, ...(item.matches ?? [])].some((prefix) =>
    matchesPath(pathname, prefix)
  );
}
