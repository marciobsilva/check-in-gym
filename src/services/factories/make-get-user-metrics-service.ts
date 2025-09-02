import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in-repository.js'
import { GetUserMetricsService } from '../get-user-metrics.js'

export function makeGetUserMetricsService() {
  const checkInRepository = new PrismaCheckInRepository()
  const getUserMetricsService = new GetUserMetricsService(checkInRepository)

  return getUserMetricsService
}
