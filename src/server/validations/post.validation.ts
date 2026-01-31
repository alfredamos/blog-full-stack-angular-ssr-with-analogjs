import {z} from "zod";

export const postSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, {message: 'Title is required!'}),
  content: z.string().min(1, {message: 'Content is required!'}),
  imageUrl: z.string().min(1, {message: 'ImageUrl is required!'}),
})

export type Post = z.infer<typeof postSchema>
