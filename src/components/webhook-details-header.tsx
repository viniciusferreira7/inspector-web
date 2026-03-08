import dayjs from "dayjs";
import type { z } from "zod";
import type { webhookDetails } from "../http/schemas/webhook-details";
import { Badge } from "./ui/badge";

interface WebhookDetailsHeaderProps {
  webhook: z.infer<typeof webhookDetails>;
}

export function WebhookDetailsHeader({ webhook }: WebhookDetailsHeaderProps) {
  return (
    <div className="space-y-4 border-zinc-700 border-b p-6">
      <div className="flex items-center gap-3">
        <Badge>{webhook.method}</Badge>
        <span className="font-medium text-lg text-zinc-300">
          {webhook.pathname}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <span>From IP</span>
          <span className="underline underline-offset-4">{webhook.ip}</span>
        </div>
        <span className="h-4 w-px bg-zinc-700" />
        <div className="flex items-center gap-1 text-sm text-zinc-400">
          <span>at</span>
          <span className="underline underline-offset-4">
            {dayjs(webhook.createdAt).format("MMMM D, Ha")}
          </span>
        </div>
      </div>
    </div>
  );
}
