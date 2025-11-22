import * as React from "react";

interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
}

export function Tabs({ defaultValue, children, className }: TabsProps) {
  const [active, setActive] = React.useState(defaultValue);

  return (
    <div className={className}>
      {React.Children.map(children, (child: any) => {
        if (child.type === TabsList)
          return React.cloneElement(child, { active, setActive });

        if (child.type === TabsContent)
          return child.props.value === active ? child : null;

        return child;
      })}
    </div>
  );
}

interface TabsListProps {
  children: React.ReactNode;
  active?: string;
  setActive?: (value: string) => void;
  className?: string;
}

export function TabsList({ children, active, setActive, className }: TabsListProps) {
  return (
    <div className={className}>
      {React.Children.map(children, (child: any) =>
        React.cloneElement(child, { active, setActive })
      )}
    </div>
  );
}

interface TabsTriggerProps {
  value: string;
  active?: string;
  setActive?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export function TabsTrigger({
  value,
  active,
  setActive,
  children,
  className,
}: TabsTriggerProps) {
  return (
    <button
      className={`${className} ${
        active === value ? "active" : ""
      }`}
      onClick={() => setActive?.(value)}
    >
      {children}
    </button>
  );
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function TabsContent({ children, className }: TabsContentProps) {
  return <div className={className}>{children}</div>;
}
