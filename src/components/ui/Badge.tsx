interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "success" | "accent";
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const variants = {
    default: "bg-brand-dark/10 text-brand-dark",
    primary: "bg-brand-blue/10 text-brand-blue",
    secondary: "bg-brand-sand/30 text-brand-dark",
    success: "bg-green-100 text-green-800",
    accent: "bg-brand-orange/10 text-brand-orange",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
