import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository.js'
import { RegisterGymService } from '../register-gym.js'

export function makeRegisterGymService() {
  const gymRepository = new PrismaGymsRepository()
  const registerGymService = new RegisterGymService(gymRepository)

  return registerGymService
}
