import { describe, it, expect } from 'vitest'
import { GetUserMetricsService } from './get-user-metrics.js'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository.js'

describe('GetUserMetricsService', () => {
  it('should get count of check ins', async () => {
    const inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    const sut = new GetUserMetricsService(inMemoryCheckInsRepository)

    for (let index = 1; index <= 22; index++) {
      await inMemoryCheckInsRepository.create({
        user_id: 'user-1',
        gym_id: `gym-${index}`,
      })
    }

    const { checkInsCount } = await sut.execute({ userId: 'user-1' })

    expect(checkInsCount).toBe(22)
  })
})
