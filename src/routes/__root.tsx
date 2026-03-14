import "@/globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Group, Panel, Separator } from "react-resizable-panels";
import { Sidebar } from "../components/sidebar";
import { queryClient } from "../lib/query-client";

const RootLayout = () => (
  <QueryClientProvider client={queryClient}>
    <div className="h-screen bg-zinc-900">
      <Group orientation="horizontal">
        <Panel defaultSize="20%" minSize="15%" maxSize="40%">
          <Sidebar />
        </Panel>
        <Separator className="w-px bg-zinc-700 transition-colors duration-150 hover:bg-zinc-600" />
        <Panel defaultSize="80%" minSize="60%" maxSize="75%">
          <Outlet />
        </Panel>
      </Group>
    </div>
    <TanStackRouterDevtools />
  </QueryClientProvider>
);

export const Route = createRootRoute({ component: RootLayout });
