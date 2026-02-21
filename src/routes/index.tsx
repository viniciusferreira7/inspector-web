import { createFileRoute } from "@tanstack/react-router";
import { Group, Panel, Separator } from "react-resizable-panels";
import { SectionDataTable } from "../components/section-data-table";
import { SectionTitle } from "../components/section-title";
import { Sidebar } from "../components/sidebar";
import { CodeBlock } from "../components/ui/code-block";
import { WebhookDetailsHeader } from "../components/webhook-details-header";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const overviewData = [
    { key: "Method", value: "POST" },
    { key: "Status code", value: "200" },
    { key: "Content-Type", value: "application/json" },
    { key: "Content-Length", value: "2564654 bytes" },
  ];

  return (
    <div className="h-screen bg-zinc-900">
      <Group orientation="horizontal">
        <Panel defaultSize="20%" minSize="15%" maxSize="40%">
          <Sidebar />
        </Panel>
        <Separator className="w-px bg-zinc-700 transition-colors duration-150 hover:bg-zinc-600" />
        <Panel defaultSize="80%" minSize="60%" maxSize="75%">
          <div className="flex h-full flex-col">
            <WebhookDetailsHeader />
            <div className="flex overflow-y-auto">
              <div className="w-full space-y-6 p-6">
                <div className="space-y-4">
                  <SectionTitle>Request Overview</SectionTitle>
                  <SectionDataTable data={overviewData} />
                </div>
                <div className="space-y-4">
                  <SectionTitle>Query parameters</SectionTitle>
                  <SectionDataTable data={overviewData} />
                </div>
                <div className="space-y-4">
                  <SectionTitle>Headers</SectionTitle>
                  <SectionDataTable data={overviewData} />
                </div>
                <div className="space-y-4">
                  <SectionTitle>Request Body</SectionTitle>
                  <CodeBlock
                    code='  <Panel defaultSize="80%" minSize="60%" maxSize="75%">
          <div className="flex h-full flex-col">
            <WebhookDetailsHeader />
            <div className="flex overflow-y-auto">
              <div className="w-full space-y-6 p-6">
                <div className="space-y-4">
                  <SectionTitle>Request Overview</SectionTitle>
                  <SectionDataTable data={overviewData} />
                </div>
                <div className="space-y-4">
                  <SectionTitle>Query parameters</SectionTitle>
                  <SectionDataTable data={overviewData} />
                </div>
                <div className="space-y-4">
                  <SectionTitle>Headers</SectionTitle>
                  <SectionDataTable data={overviewData} />
                </div>
                <div className="space-y-4">
                  <SectionTitle>Request Body</SectionTitle>'
                    language="typescript"
                  />
                </div>
              </div>
            </div>
          </div>
        </Panel>
      </Group>
    </div>
  );
}
