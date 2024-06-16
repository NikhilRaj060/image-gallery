import { type } from "os";
import { z } from "zod";

const BasicImageSchema = z.object({
  page: z.number(),
  per_page: z.number(),
  prev_page: z.string().optional(),
  next_page: z.string().optional(),
  total_results: z.number(),
});
const PicSchema = z.object({
  id: z.number(),
  width: z.number(),
  height: z.number(),
  url: z.string(),
  src: z.object({
    large: z.string(),
  }),
  alt: z.string(),
  blurreddataUrl: z.string().optional(),
});

export const ImageSchemaWithPhoto = BasicImageSchema.extend({
  photos: z.array(PicSchema),
});

export type Photo = z.infer<typeof PicSchema>;
export type ImagesResult = z.infer<typeof ImageSchemaWithPhoto>;
