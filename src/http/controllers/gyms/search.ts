import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeSearchGymsService } from '@/services/factories/make-search-gyms-service.js'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    search: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { search, page } = searchGymsQuerySchema.parse(request.query)

  const searchGyms = makeSearchGymsService()

  const { gyms } = await searchGyms.execute({
    search,
    page,
  })

  return reply.status(200).send({ gyms })
}
