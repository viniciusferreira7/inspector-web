import type { ComponentProps } from "react";
import { cnMerge } from "tailwind-variants";

interface BadgeProps extends ComponentProps<"span"> {}

export function Badge({ className, ...props }: BadgeProps) {
  return (
    <span
      className={cnMerge(
        "rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-1 font-mono font-semibold text-sm text-zinc-100",
        className
      )({ twMerge: true })}
      {...props}
    />
  );
}
