import { Badge } from "./ui/badge";

export function WebhookDetailsHeader() {
  return (
    <div className="space-y-4 border-zinc-700 border-b p-6">
      <div className="flex items-center gap-3">
        <Badge>POST</Badge>
        <span className="font-medium text-lg text-zinc-300">/video/status</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <span>From IP</span>
          <span className="underline underline-offset-4">123.123.132.12</span>
        </div>
        <span className="h-4 w-px bg-zinc-700" />
        <div className="flex items-center gap-1 text-sm text-zinc-400">
          <span>at</span>
          <span className="underline underline-offset-4">April 18, 14pm</span>
        </div>
      </div>
    </div>
  );
}
