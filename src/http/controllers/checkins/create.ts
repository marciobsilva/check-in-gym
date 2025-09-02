import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCheckInService } from '@/services/factories/make-check-in-service.js'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInBodySchema = z.object({
    userLatitude: z.coerce.number().refine((value) => {
      return value >= -90 && value <= 90
    }),
    userLongitude: z.coerce.number().refine((value) => {
      return value >= -180 && value <= 180
    }),
  })

  const createCheckInParamsSchema = z.object({
    gymId: z.uuid(),
  })

  const { userLatitude, userLongitude } = createCheckInBodySchema.parse(
    request.body,
  )
  const { gymId } = createCheckInParamsSchema.parse(request.params)
  const { sub: userId } = request.user

  const createCheckIn = makeCheckInService()

  await createCheckIn.execute({
    gymId,
    userId,
    userLatitude,
    userLongitude,
  })

  return reply.status(201).send()
}
