# Inspector Web

A web interface for inspecting incoming webhook requests in real time. Built with React, TanStack Router, and TanStack Query.

Requires the [inspector-api](https://github.com/viniciusferreira7/inspector-api) backend to be running.

## Features

- List incoming webhooks with infinite scroll pagination
- Inspect request details: method, status code, headers, query params, and body
- Syntax highlighted request body via Shiki
- Optimistic delete of webhooks
- Resizable sidebar/detail panel layout

## Tech Stack

- **React 19** + **TypeScript**
- **TanStack Router** — file-based routing
- **TanStack Query** — data fetching and cache management
- **Tailwind CSS v4** + **tailwind-variants**
- **Zod** — runtime schema validation
- **Shiki** — syntax highlighting
- **Biome** — linting and formatting

## Getting Started

```bash
bun install
bun dev
```

Set the API URL in a `.env` file:

```env
VITE_API_URL=http://localhost:3333
```
