import z from 'zod'

const Post = z.object({
  writerId: z.string(),
  title: z.string(),
  content: z.string(),
  tags: z.array(z.string())
})

export function validatePost (input) {
  return Post.safeParse(input)
}

export function validatePartialPost (input) {
  return Post.partial().safeParse(input)
}
