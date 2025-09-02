import { describe, it, expect } from 'vitest'
import { FetchUserCheckInsHistoryService } from './fetch-user-check-ins-history.js'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository.js'

describe('FetchUserCheckInsHistoryService', () => {
  it('should fetch check-ins history for a user', async () => {
    const inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    const sut = new FetchUserCheckInsHistoryService(inMemoryCheckInsRepository)

    await inMemoryCheckInsRepository.create({
      user_id: 'user-1',
      gym_id: 'gym-1',
    })

    const { checkIns } = await sut.execute({ userId: 'user-1', page: 1 })

    expect(checkIns).toHaveLength(1)

    expect(checkIns).toEqual([
      expect.objectContaining({
        id: expect.any(String),
      }),
    ])
  })

  it('should fetch check-ins by pages', async () => {
    const inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    const sut = new FetchUserCheckInsHistoryService(inMemoryCheckInsRepository)

    for (let index = 1; index <= 22; index++) {
      await inMemoryCheckInsRepository.create({
        user_id: 'user-1',
        gym_id: `gym-${index}`,
      })
    }

    const { checkIns } = await sut.execute({ userId: 'user-1', page: 2 })

    expect(checkIns).toEqual([
      expect.objectContaining({
        id: expect.any(String),
        gym_id: 'gym-21',
      }),
      expect.objectContaining({
        id: expect.any(String),
        gym_id: 'gym-22',
      }),
    ])
  })
})
