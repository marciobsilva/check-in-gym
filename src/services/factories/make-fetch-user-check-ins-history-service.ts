import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in-repository.js'
import { FetchUserCheckInsHistoryService } from '../fetch-user-check-ins-history.js'

export function makeFetchUserCheckInsHistoryService() {
  const checkInRepository = new PrismaCheckInRepository()
  const fetchUserCheckInsHistoryService = new FetchUserCheckInsHistoryService(
    checkInRepository,
  )

  return fetchUserCheckInsHistoryService
}
