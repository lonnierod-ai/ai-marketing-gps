interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({
  children,
  className = "",
  hover = false,
}: CardProps) {
  return (
    <div
      className={`bg-white rounded-lg border border-brand-sand/40 shadow-sm ${
        hover ? "transition-all hover:shadow-md hover:border-brand-orange/30 cursor-pointer" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
