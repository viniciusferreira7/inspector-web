import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import { Suspense } from "react";
import { Group, Panel, Separator } from "react-resizable-panels";
import z from "zod";
import { SectionDataTable } from "../components/section-data-table";
import { SectionTitle } from "../components/section-title";
import { Sidebar } from "../components/sidebar";
import { CodeBlock } from "../components/ui/code-block";
import { WebhookDetailsHeader } from "../components/webhook-details-header";
import { env } from "../env";
import { webhookDetails } from "../http/schemas/webhook-details";

const searchSchema = z.object({
  webhook_id: z.uuidv7(),
});

export const Route = createFileRoute("/")({
  component: Index,
  validateSearch: searchSchema.parse,
});

function parseJsonToTable(raw: string): Array<{ key: string; value: string }> {
  try {
    const parsed = JSON.parse(raw);
    return Object.entries(parsed).map(([key, value]) => ({
      key,
      value: String(value),
    }));
  } catch {
    return [];
  }
}

function WebhookDetailsSkeleton() {
  return (
    <div className="flex h-full flex-col">
      <div className="space-y-4 border-zinc-700 border-b p-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-16 animate-pulse rounded-lg bg-zinc-700" />
          <div className="h-6 w-48 animate-pulse rounded bg-zinc-700" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-40 animate-pulse rounded bg-zinc-700" />
          <div className="h-4 w-px bg-zinc-700" />
          <div className="h-4 w-32 animate-pulse rounded bg-zinc-700" />
        </div>
      </div>
      <div className="flex overflow-y-auto">
        <div className="w-full space-y-6 p-6">
          {Array.from({ length: 3 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton
            <div key={i} className="space-y-4">
              <div className="h-5 w-36 animate-pulse rounded bg-zinc-700" />
              <div className="overflow-hidden rounded-lg border border-zinc-700">
                {Array.from({ length: 4 }).map((_, j) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton
                  <div
                    key={j}
                    className="flex border-zinc-700 border-b last:border-0"
                  >
                    <div className="w-1/4 bg-zinc-800/50 p-3">
                      <div className="h-4 w-24 animate-pulse rounded bg-zinc-700" />
                    </div>
                    <div className="flex-1 p-3">
                      <div className="h-4 w-32 animate-pulse rounded bg-zinc-700" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="space-y-4">
            <div className="h-5 w-36 animate-pulse rounded bg-zinc-700" />
            <div className="h-40 animate-pulse rounded-lg border border-zinc-700 bg-zinc-800" />
          </div>
        </div>
      </div>
    </div>
  );
}

function WebhookDetails({ id }: { id: string }) {
  const { data } = useSuspenseQuery({
    queryKey: ["webhooks", id],
    queryFn: async () => {
      const response = await fetch(`${env.VITE_API_URL}/webhooks/${id}`);
      const json = await response.json();
      return webhookDetails.parse(json);
    },
  });

  const overviewData = [
    { key: "Method", value: data.method },
    { key: "Status code", value: String(data.statusCode) },
    { key: "Content-Type", value: data.contentType },
    { key: "Content-Length", value: `${data.contentLength} bytes` },
  ];

  return (
    <div className="flex h-full flex-col">
      <WebhookDetailsHeader webhook={data} />
      <div className="flex overflow-y-auto">
        <div className="w-full space-y-6 p-6">
          <div className="space-y-4">
            <SectionTitle>Request Overview</SectionTitle>
            <SectionDataTable data={overviewData} />
          </div>
          <div className="space-y-4">
            <SectionTitle>Query parameters</SectionTitle>
            <SectionDataTable data={parseJsonToTable(data.queryParams)} />
          </div>
          <div className="space-y-4">
            <SectionTitle>Headers</SectionTitle>
            <SectionDataTable data={parseJsonToTable(data.headers)} />
          </div>
          <div className="space-y-4">
            <SectionTitle>Request Body</SectionTitle>
            <CodeBlock code={data.body} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Index() {
  const { webhook_id } = useSearch({ from: "/" });

  return (
    <div className="h-screen bg-zinc-900">
      <Group orientation="horizontal">
        <Panel defaultSize="20%" minSize="15%" maxSize="40%">
          <Sidebar />
        </Panel>
        <Separator className="w-px bg-zinc-700 transition-colors duration-150 hover:bg-zinc-600" />
        <Panel defaultSize="80%" minSize="60%" maxSize="75%">
          <Suspense fallback={<WebhookDetailsSkeleton />}>
            <WebhookDetails id={webhook_id} />
          </Suspense>
        </Panel>
      </Group>
    </div>
  );
}
