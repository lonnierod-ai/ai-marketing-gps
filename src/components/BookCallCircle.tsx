import Link from "next/link";
import { BOOK_CALL_HREF } from "@/lib/navigation";

type BookCallCircleProps = {
  onClick?: () => void;
  className?: string;
};

// The large orange circle CTA (spec section 5). The header does not use it.
export default function BookCallCircle({
  onClick,
  className = "",
}: BookCallCircleProps) {
  return (
    <Link
      href={BOOK_CALL_HREF}
      onClick={onClick}
      className={`inline-flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-brand-orange text-center text-xl font-bold leading-tight text-brand-charcoal transition-colors hover:bg-brand-orange-hover hover:text-brand-charcoal min-[990px]:h-40 min-[990px]:w-40 ${className}`}
    >
      Book a call
    </Link>
  );
}
