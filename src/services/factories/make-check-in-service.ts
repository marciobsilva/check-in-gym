import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in-repository.js'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository.js'
import { CheckInService } from '../check-in.js'

export function makeCheckInService() {
  const checkInRepository = new PrismaCheckInRepository()
  const gymRepository = new PrismaGymsRepository()
  const checkInService = new CheckInService(checkInRepository, gymRepository)

  return checkInService
}
