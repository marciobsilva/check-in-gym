import type { GymsRepository } from '@/repositories/gyms-repository.js'
import type { Gym } from 'generated/prisma/index.js'

interface RegisterGymServiceRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface RegisterGymServiceResponse {
  gym: Gym
}

export class RegisterGymService {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: RegisterGymServiceRequest): Promise<RegisterGymServiceResponse> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    return { gym }
  }
}
