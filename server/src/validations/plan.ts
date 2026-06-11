import { z } from "zod";

export const planSchema = z.object({
  body: z.object({
    userId: z.string(),
  }),
});

export const currentPlanSchema = z.object({
  query: z.object({
    userId: z.string(),
  }),
});
