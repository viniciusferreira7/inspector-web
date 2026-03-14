import type { ComponentProps } from "react";
import { cnMerge } from "tailwind-variants";

interface SectionDataTable extends ComponentProps<"div"> {
  data: Record<string, unknown>;
}

export function SectionDataTable({
  data,
  className,
  ...props
}: SectionDataTable) {
  return (
    <div
      className={cnMerge(
        "overflow-hidden rounded-lg border border-zinc-700",
        className
      )({ twMerge: true })}
      {...props}
    >
      <table className="w-full">
        <tbody>
          {Object.entries(data).map(([key, value]) => {
            return (
              <tr key={key} className="border-zinc-700 border-b last:border-0">
                <td className="w-1/4 border-zinc-700 border-r bg-zinc-800/50 p-3 font-medium text-sm text-zinc-400">
                  {key}
                </td>
                <td className="w-3/4 p-3 font-mono text-sm text-zinc-300">
                  {String(value)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
