import { useQuery } from "@tanstack/react-query";
import { SectionDataTable } from "../../../../components/section-data-table";
import { SectionTitle } from "../../../../components/section-title";
import { CodeBlock } from "../../../../components/ui/code-block";
import { WebhookDetailsHeader } from "../../../../components/webhook-details-header";
import { env } from "../../../../env";
import { webhookDetails } from "../../../../http/schemas/webhook-details";
import { WebhookDetailsSkeleton } from "./webhook-details-skeleton";
import { WebhookNotFound } from "./webhook-not-found";

export function WebhookDetails({ id }: { id: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["webhooks", id],
    queryFn: async () => {
      const response = await fetch(`${env.VITE_API_URL}/webhooks/${id}`);
      const json = await response.json();

      return webhookDetails.parse(json);
    },
  });

  if (isLoading) return <WebhookDetailsSkeleton />;

  if (!data) return <WebhookNotFound />;

  const overviewData = {
    Method: data?.method,
    "Status code": String(data?.statusCode),
    "Content-Type": data?.contentType,
    "Content-Length": `${data?.contentLength} bytes`,
  };

  return (
    <div className="flex h-full w-full flex-col">
      <WebhookDetailsHeader webhook={data} />
      <div className="flex overflow-y-auto">
        <div className="w-full space-y-6 p-6">
          <div className="space-y-4">
            <SectionTitle>Request Overview</SectionTitle>
            <SectionDataTable data={overviewData} />
          </div>
          {data?.queryParams && (
            <div className="space-y-4">
              <SectionTitle>Query parameters</SectionTitle>
              <SectionDataTable data={data?.queryParams} />
            </div>
          )}
          {data.headers && (
            <div className="space-y-4">
              <SectionTitle>Headers</SectionTitle>
              <SectionDataTable data={data.headers} />
            </div>
          )}
          {data.body && (
            <div className="space-y-4">
              <SectionTitle>Request Body</SectionTitle>
              <CodeBlock code={data.body} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
