import type { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt.js'
import { create } from './create.js'
import { validate } from './validate.js'
import { history } from './history.js'
import { metrics } from './metrics.js'
import { verifyRole } from '@/http/middlewares/verify-role.js'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/checkins/history', history)
  app.get('/checkins/metrics', metrics)

  app.post('/gyms/:gymId/checkins', create)

  app.patch(
    '/checkins/:checkInId/validate',
    { onRequest: [verifyRole('ADMIN')] },
    validate,
  )
}
