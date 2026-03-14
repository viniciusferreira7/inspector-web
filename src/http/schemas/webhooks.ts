import { z } from "zod";

export const webhookListItemSchema = z.object({
  id: z.uuidv7(),
  method: z.string(),
  pathname: z.string(),
  createdAt: z.coerce.date(),
});

export const webhookListSchema = z.object({
  webhooks: z.array(webhookListItemSchema),
  nextCursor: z.uuidv7().nullable(),
});

export type WebhookListPage = z.infer<typeof webhookListSchema>;
