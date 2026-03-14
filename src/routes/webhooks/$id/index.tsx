import { createFileRoute, useParams } from "@tanstack/react-router";
import { WebhookDetails } from "./_components/webhook-details";

export const Route = createFileRoute("/webhooks/$id/")({
  component: Index,
});

function Index() {
  const { id } = useParams({
    from: "/webhooks/$id/",
  });

  return <WebhookDetails id={id} />;
}
