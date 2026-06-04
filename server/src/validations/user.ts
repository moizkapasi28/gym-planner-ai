import { z } from "zod";

export const profileSchema = z.object({
  body: z.object({
    userId: z.string(),
    goal: z.string().trim().default("bulk"),
    experience: z.string().trim().default("beginner"),
    days: z.string().trim().default("3"),
    session: z.string().trim().default("45"),
    equipment: z.string().trim().default("none"),
    split: z.string().trim().default("fullbody"),
    injuries: z.string().trim().default(""),
  }),
});
