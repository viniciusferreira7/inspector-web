import { createFileRoute } from "@tanstack/react-router";
import { Group, Panel, Separator } from "react-resizable-panels";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="h-screen bg-zinc-900">
      <Group orientation="horizontal">
        <Panel defaultSize="20%" minSize="15%" maxSize="40%">
          sidebar
        </Panel>
        <Separator className="w-px bg-zinc-700 transition-colors duration-150 hover:bg-zinc-600" />
        <Panel defaultSize="80%" minSize="60%" maxSize="75%">
          content
        </Panel>
      </Group>
    </div>
  );
}
