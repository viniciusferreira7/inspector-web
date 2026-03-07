import { useSuspenseQuery } from "@tanstack/react-query";
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
  const { data } = useSuspenseQuery({
    queryKey: ["webhooks"],
    queryFn: async () => {
      const response = await fetch(`${env.VITE_API_URL}/webhooks`);
      const data = await response.json();

      return webhookListSchema.parse(data);
    },
  });

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="space-y-1 p-2">
        {data.webhooks.map((webhook) => (
          <WebHooksListItem key={webhook.id} webhook={webhook} />
        ))}
      </div>
    </div>
  );
}
