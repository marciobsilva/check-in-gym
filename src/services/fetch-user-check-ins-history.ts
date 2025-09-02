import type { CheckInsRepository } from '@/repositories/check-ins-repository.js'
import type { CheckIn } from 'generated/prisma/index.js'

interface FetchUserCheckInsHistoryServiceRequest {
  userId: string
  page: number
}

interface FetchUserCheckInsHistoryServiceResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsHistoryServiceRequest): Promise<FetchUserCheckInsHistoryServiceResponse> {
    const checkIns = await this.checkInsRepository.findCheckInsByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
