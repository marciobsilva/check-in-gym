import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository.js'
import { SearchGymsService } from '../search-gyms.js'

export function makeSearchGymsService() {
  const gymRepository = new PrismaGymsRepository()
  const searchGymsService = new SearchGymsService(gymRepository)

  return searchGymsService
}
