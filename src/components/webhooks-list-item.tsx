import { Link } from "@tanstack/react-router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Trash2Icon } from "lucide-react";
import type z from "zod";
import type { webhookListItemSchema } from "../http/schemas/webhooks";
import { Checkbox } from "./ui/checkbox";
import { IconButton } from "./ui/icon-button";

dayjs.extend(relativeTime);

interface WebhookListItemProps {
  webhook: z.infer<typeof webhookListItemSchema>;
}

export function WebHooksListItem({ webhook }: WebhookListItemProps) {
  return (
    <div className="group rounded-lg transition-colors duration-150 hover:bg-zinc-700/30">
      <div className="flex items-start gap-3 px-4 py-3.5">
        <Checkbox />
        <Link
          to="/$id"
          params={{ id: webhook.id }}
          className="flex min-w-0 flex-1 items-start gap-3"
        >
          <span className="w-12 shrink-0 text-right font-mono font-semibold text-xs text-zinc-300">
            {webhook.method}
          </span>
          <div className="min-w=0 flex-1">
            <p className="truncate text-shadow-2xs text-zinc-200 leading-tight">
              {webhook.pathname}
            </p>
            <p className="mt-1 font-medium text-xs text-zinc-500">
              {dayjs(webhook.createdAt).fromNow()}
            </p>
          </div>
        </Link>
        <IconButton
          icon={<Trash2Icon className="size-3.5 text-zinc-400" />}
          className="cursor-pointer opacity-0 transition-opacity group-hover:opacity-100"
        />
      </div>
    </div>
  );
}
