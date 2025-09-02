import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in-repository.js'
import { ValidateCheckInService } from '../validate-check-in.js'

export function makeValidateCheckInService() {
  const checkInRepository = new PrismaCheckInRepository()
  const validateCheckInService = new ValidateCheckInService(checkInRepository)

  return validateCheckInService
}
