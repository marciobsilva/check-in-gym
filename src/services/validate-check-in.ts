import type { CheckInsRepository } from '@/repositories/check-ins-repository.js'
import type { CheckIn } from 'generated/prisma/index.js'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'
import dayjs from 'dayjs'
import { LateCheckInValidationsError } from './errors/late-check-in-validation-error.js'

interface ValidateCheckInServiceRequest {
  checkInId: string
}

interface ValidateCheckInServiceResponse {
  checkIn: CheckIn
}

export class ValidateCheckInService {
  constructor(private checkInRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInServiceRequest): Promise<ValidateCheckInServiceResponse> {
    const checkIn = await this.checkInRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationsError()
    }

    checkIn.validated_at = new Date()

    this.checkInRepository.save(checkIn)

    return { checkIn }
  }
}
