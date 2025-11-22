import * as React from "react";

interface ScrollAreaProps {
  children: React.ReactNode;
  className?: string;
}

export function ScrollArea({ children, className }: ScrollAreaProps) {
  return (
    <div className={`overflow-y-auto max-h-64 p-2 ${className ?? ""}`}>
      {children}
    </div>
  );
}
