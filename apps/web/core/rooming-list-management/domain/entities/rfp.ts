import { z } from "zod";

export const rfpSchema = z.object({
  rfp_launchpad_id: z.string(),
  event_name: z.string(),
  event_internal_name: z.string(),
  event_start_date: z.date(),
  event_end_date: z.date(),
  agreement_type: z.string(),
  agreement_path: z.string(),
});

export type Rfp = z.infer<typeof rfpSchema>;
