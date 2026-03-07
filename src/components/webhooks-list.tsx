import { useSuspenseQuery } from "@tanstack/react-query";
import { env } from "../env";
import { webhookListSchema } from "../http/schemas/webhooks";
import { WebHooksListItem } from "./webhooks-list-item";

export function WebhooksList() {
  const { data: webhooks } = useSuspenseQuery({
    queryKey: ["webhooks"],
    queryFn: async () => {
      const response = await fetch(`${env.VITE_API_URL}/webhooks`);
      console.log({ response });
      return webhookListSchema.parse(response.json());
    },
  });

  console.log({ webhooks });

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="space-y-1 p-2">
        <WebHooksListItem />
        <WebHooksListItem />
        <WebHooksListItem />
        <WebHooksListItem />
        <WebHooksListItem />
        <WebHooksListItem />
        <WebHooksListItem />
        <WebHooksListItem />
      </div>
    </div>
  );
}
