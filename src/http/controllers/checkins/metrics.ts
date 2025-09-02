import type { FastifyRequest, FastifyReply } from 'fastify'

import { makeGetUserMetricsService } from '@/services/factories/make-get-user-metrics-service.js'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const { sub: userId } = request.user

  const metricsCheckIns = makeGetUserMetricsService()

  const { checkInsCount } = await metricsCheckIns.execute({
    userId,
  })

  return reply.status(200).send({
    checkInsCount,
  })
}
