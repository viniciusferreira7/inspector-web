import z from "zod";

export const webhookDetails = z.object({
  id: z.uuidv7(),
  method: z.string(),
  pathname: z.string(),
  ip: z.string(),
  statusCode: z.number().min(100).max(599),
  contentType: z.string(),
  contentLength: z.number(),
  queryParams: z.string(),
  headers: z.string(),
  body: z.string(),
  createdAt: z.coerce.date(),
});
