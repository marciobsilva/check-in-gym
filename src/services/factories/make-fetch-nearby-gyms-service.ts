import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository.js'
import { FetchNearbyGymsService } from '../fetch-nearby-gyms.js'

export function makeFetchNearbyGymsService() {
  const gymRepository = new PrismaGymsRepository()
  const fetchNearbyGymsService = new FetchNearbyGymsService(gymRepository)

  return fetchNearbyGymsService
}
