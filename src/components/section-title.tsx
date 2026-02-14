import type { ComponentProps } from "react";
import { cnMerge } from "tailwind-variants";

interface SectionTitleProps extends ComponentProps<"h3"> {}

export function SectionTitle({ className, ...props }: SectionTitleProps) {
  return (
    <h3
      className={cnMerge(
        "font-semibold text-base text-zinc-100",
        className
      )({ twMerge: true })}
      {...props}
    />
  );
}
