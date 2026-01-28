import {z} from "zod";

export const postSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  content: z.string(),
  authorId: z.string().optional(),
})

export type Post = z.infer<typeof postSchema>
