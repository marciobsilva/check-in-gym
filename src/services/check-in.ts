import type { CheckInsRepository } from '@/repositories/check-ins-repository.js'
import type { GymsRepository } from '@/repositories/gyms-repository.js'
import type { CheckIn } from 'generated/prisma/index.js'
import { AlreadyCheckInTodayError } from './errors/already-check-in-today-error.js'
import { GymIsTooFarError } from './errors/gym-is-too-far-error.js'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates.js'

interface CheckInServiceRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInServiceResponse {
  checkIn: CheckIn
}

export class CheckInService {
  constructor(
    private checkInRepository: CheckInsRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInServiceRequest): Promise<CheckInServiceResponse> {
    const isGymExists = await this.gymsRepository.findById(gymId)

    if (!isGymExists) {
      throw new ResourceNotFoundError()
    }

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      {
        latitude: isGymExists.latitude.toNumber(),
        longitude: isGymExists.longitude.toNumber(),
      },
    )

    const MAX_DISTANCE_IN_KILOMETERS = 0.1
    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new GymIsTooFarError()
    }

    const isCheckInToday = await this.checkInRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (isCheckInToday) {
      throw new AlreadyCheckInTodayError()
    }

    const checkIn = await this.checkInRepository.create({
      user_id: userId,
      gym_id: gymId,
    })

    return { checkIn }
  }
}
