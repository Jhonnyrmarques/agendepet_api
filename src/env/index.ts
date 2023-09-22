import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.string(),
  JWT_SECRET: z.string(),
  JWT_TOKEN_EXPIRESS: z.string(),
  JWT_REFRESH_TOKEN_EXPIRESS: z.string(),
  PORT: z.coerce.number(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.log('Invalid enviroment variables', _env.error.format())

  throw new Error('Invalid enviroment variables')
}

export const env = _env.data
