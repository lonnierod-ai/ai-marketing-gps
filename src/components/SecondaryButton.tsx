import Link from "next/link";
import type { ReactNode } from "react";

type SecondaryButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

// Spec section 5 secondary action: ground fill, cobalt outline and text,
// orange-soft fill on hover. Styles in globals.css ("Buttons").
export default function SecondaryButton({
  href,
  children,
  className = "",
}: SecondaryButtonProps) {
  return (
    <Link href={href} className={`button-secondary ${className}`}>
      {children}
    </Link>
  );
}
