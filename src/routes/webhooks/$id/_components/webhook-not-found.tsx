export function WebhookNotFound() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="max-w-md text-center">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-10 shadow-sm">
          <h1 className="font-semibold text-4xl text-white">Page not found</h1>

          <p className="mt-3 text-sm text-zinc-400">
            The page you are looking for does not exist or may have been moved.
          </p>

          <a
            href="/"
            className="mt-6 inline-block rounded-md bg-zinc-100 px-4 py-2 font-medium text-sm text-zinc-900 hover:bg-zinc-200"
          >
            Go back home
          </a>
        </div>
      </div>
    </div>
  );
}
