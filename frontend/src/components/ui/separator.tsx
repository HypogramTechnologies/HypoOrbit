interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
}

export function Separator({ orientation = "horizontal" }: SeparatorProps) {
  return (
    <div
      className={
        orientation === "horizontal"
          ? "w-full h-px bg-gray-300 my-2"
          : "h-full w-px bg-gray-300 mx-2"
      }
    />
  );
}
