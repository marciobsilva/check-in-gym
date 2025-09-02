import type { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt.js'
import { search } from './search.js'
import { nearby } from './nearby.js'
import { create } from './create.js'
import { verifyRole } from '@/http/middlewares/verify-role.js'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)

  app.post('/gyms', { onRequest: [verifyRole('ADMIN')] }, create)
}
