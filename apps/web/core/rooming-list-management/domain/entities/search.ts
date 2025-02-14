import { z } from "zod";

export const SearchSchema = z.object({
  query: z.string(),
  before: z.string().date(),
  after: z.string().date(),
  filters: z.array(z.number()),
});

export type Search = z.infer<typeof SearchSchema>;
