import z from 'zod'

const User = z.object({
  name: z.string(),
  password: z.string().min(8),
  email: z.string().email()
})

export function validateUser (input) {
  return User.safeParse(input)
}

export function validatePartialUser (input) {
  return User.partial().safeParse(input)
}
