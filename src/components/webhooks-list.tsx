import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { env } from "../env";
import { webhookListSchema } from "../http/schemas/webhooks";
import { WebHooksListItem } from "./webhooks-list-item";

function WebhooksListSkeletonItem() {
  return (
    <div className="rounded-lg px-4 py-3.5">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 size-4 shrink-0 animate-pulse rounded bg-zinc-700" />
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <div className="h-4 w-12 shrink-0 animate-pulse rounded bg-zinc-700" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-700" />
            <div className="h-3 w-1/4 animate-pulse rounded bg-zinc-700" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function WebhooksListSkeleton() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="space-y-1 p-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <WebhooksListSkeletonItem key={i} />
        ))}
      </div>
    </div>
  );
}

export function WebhooksList() {
  const observerRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["webhooks"],
      queryFn: async ({ pageParam }) => {
        const url = new URL(`${env.VITE_API_URL}/webhooks`);
        url.searchParams.set("limit", "20");
        if (pageParam) url.searchParams.set("cursor", pageParam);

        const response = await fetch(url.toString());
        const json = await response.json();

        return webhookListSchema.parse(json);
      },
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    });

  useEffect(() => {
    const el = observerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const webhooks = data?.pages.flatMap((page) => page.webhooks) ?? [];

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="space-y-1 p-2">
        {webhooks.map((webhook) => (
          <WebHooksListItem key={webhook.id} webhook={webhook} />
        ))}
        <div ref={observerRef}>
          {isFetchingNextPage && <WebhooksListSkeletonItem />}
        </div>
      </div>
    </div>
  );
}
