import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { CopyIcon } from "lucide-react";
import { env } from "../env";
import { webhookDetails } from "../http/schemas/webhook-details";
import { IconButton } from "./ui/icon-button";
import { WebhooksList } from "./webhooks-list";

export function Sidebar() {
  const { id } = useParams({ strict: false });
  const { data, isLoading } = useQuery({
    queryKey: ["webhooks", id],
    enabled: !!id,
    queryFn: async () => {
      const response = await fetch(`${env.VITE_API_URL}/webhooks/${id}`);
      const json = await response.json();

      return webhookDetails.parse(json);
    },
  });

  return (
    <div className="flex h-screen flex-col">
      <div className="flex items-center justify-between border-zinc-700 border-b px-4 py-5">
        <div className="flex items-baseline">
          <span className="font-semibold text-zinc-400">webhook.</span>
          <span className="font-normal text-zinc-400">inspect</span>
        </div>
      </div>
      {data?.pathname && (
        <div className="flex items-center justify-between border-zinc-700 border-b bg-zinc-800 px-4 py-2.5">
          <div className="flex min-w-0 flex-1 items-center gap-1 font-mono text-xs text-zinc-300">
            {isLoading ? (
              <div className="h-3.5 w-48 animate-pulse rounded bg-zinc-700" />
            ) : (
              <span className="truncate">
                {env.VITE_API_URL}
                {data?.pathname}
              </span>
            )}
          </div>
          <IconButton icon={<CopyIcon className="size-4" />} />
        </div>
      )}
      <WebhooksList />
    </div>
  );
}
