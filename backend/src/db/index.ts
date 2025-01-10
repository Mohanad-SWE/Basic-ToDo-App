import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import * as schema from './schemas'

export const initializeDB = (url: string) => {
  return drizzle(neon(url), {
    schema: schema,
    logger: true,
  })
}
