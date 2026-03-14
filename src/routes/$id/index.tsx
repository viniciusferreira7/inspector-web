import { createFileRoute, useParams } from "@tanstack/react-router";
import { WebhookDetails } from "./_compoenents/webhook-details";

export const Route = createFileRoute("/$id/")({
  component: Index,
});

function Index() {
  const { id } = useParams({
    from: "/$id/",
  });

  return <WebhookDetails id={id} />;
}
