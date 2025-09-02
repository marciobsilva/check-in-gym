import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFetchUserCheckInsHistoryService } from '@/services/factories/make-fetch-user-check-ins-history-service.js'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const historyCheckInQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = historyCheckInQuerySchema.parse(request.query)
  const { sub: userId } = request.user

  const historyCheckIn = makeFetchUserCheckInsHistoryService()

  const { checkIns } = await historyCheckIn.execute({
    userId,
    page,
  })

  return reply.status(200).send({
    checkIns,
  })
}
