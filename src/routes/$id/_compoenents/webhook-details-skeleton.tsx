export function WebhookDetailsSkeleton() {
  return (
    <div className="flex h-full flex-col">
      <div className="space-y-4 border-zinc-700 border-b p-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-16 animate-pulse rounded-lg bg-zinc-700" />
          <div className="h-6 w-48 animate-pulse rounded bg-zinc-700" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-40 animate-pulse rounded bg-zinc-700" />
          <div className="h-4 w-px bg-zinc-700" />
          <div className="h-4 w-32 animate-pulse rounded bg-zinc-700" />
        </div>
      </div>
      <div className="flex overflow-y-auto">
        <div className="w-full space-y-6 p-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="h-5 w-36 animate-pulse rounded bg-zinc-700" />
              <div className="overflow-hidden rounded-lg border border-zinc-700">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div
                    key={j}
                    className="flex border-zinc-700 border-b last:border-0"
                  >
                    <div className="w-1/4 bg-zinc-800/50 p-3">
                      <div className="h-4 w-24 animate-pulse rounded bg-zinc-700" />
                    </div>
                    <div className="flex-1 p-3">
                      <div className="h-4 w-32 animate-pulse rounded bg-zinc-700" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="space-y-4">
            <div className="h-5 w-36 animate-pulse rounded bg-zinc-700" />
            <div className="h-40 animate-pulse rounded-lg border border-zinc-700 bg-zinc-800" />
          </div>
        </div>
      </div>
    </div>
  );
}
