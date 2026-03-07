import { z } from "zod";

export const webhookListItemSchema = z.object({
  id: z.uuidv7(),
  method: z.string(),
  pathname: z.string(),
  created_at: z.coerce.date(),
});

export const webhookListSchema = z.array(webhookListItemSchema);
