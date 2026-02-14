import type { ComponentProps } from "react";
import { cnMerge } from "tailwind-variants";

interface CodeBlockProps extends ComponentProps<"div"> {}

export function CodeBlock({ className, ...props }: CodeBlockProps) {
  return (
    <div
      className={cnMerge(
        "relative overflow-x-auto rounded-lg border border-zinc-700",
        className
      )({ twMerge: true })}
      {...props}
    ></div>
  );
}
