import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="max-w-md text-center">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-10 shadow-sm">
          <h1 className="font-semibold text-3xl text-white">
            Select a webhook
          </h1>

          <p className="mt-3 text-lg text-zinc-400 leading-relaxed">
            Choose a webhook from the sidebar to view its details, inspect
            recent deliveries, and manage its configuration.
          </p>
        </div>
      </div>
    </div>
  );
}
