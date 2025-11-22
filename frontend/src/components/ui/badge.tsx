import * as React from "react";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "secondary" | "outline" | "default";
}

export function Badge({ children, className, variant = "default" }: BadgeProps) {
  const base = "inline-flex items-center px-2 py-1 rounded text-xs font-medium";

  const variants = {
    default: "bg-gray-200 text-gray-900",
    secondary: "bg-gray-300 text-gray-700",
    outline: "border border-gray-400 text-gray-700",
  };

  return (
    <span className={`${base} ${variants[variant]} ${className || ""}`}>
      {children}
    </span>
  );
}
