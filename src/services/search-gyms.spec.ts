import { describe, it, expect } from 'vitest'
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository.js'
import { SearchGymsService } from './search-gyms.js'

describe('SearchGymsService', () => {
  it('should fetch gyms by search term and page', async () => {
    const inMemoryGymsRepository = new InMemoryGymsRepository()
    const sut = new SearchGymsService(inMemoryGymsRepository)

    await inMemoryGymsRepository.create({
      title: 'Gym 1',
      description: 'Description 1',
      phone: '123456789',
      latitude: 0,
      longitude: 0,
    })

    await inMemoryGymsRepository.create({
      title: 'Gym 2',
      description: 'Description 2',
      phone: '987654321',
      latitude: 0,
      longitude: 0,
    })

    const { gyms } = await sut.execute({ search: '1', page: 1 })

    expect(gyms).toHaveLength(1)
  })

  it('should fetch search gym in pages', async () => {
    const inMemoryGymsRepository = new InMemoryGymsRepository()
    const sut = new SearchGymsService(inMemoryGymsRepository)

    for (let index = 1; index <= 22; index++) {
      await inMemoryGymsRepository.create({
        title: `Gym ${index}`,
        description: `Description ${index}`,
        phone: `123456789`,
        latitude: 0,
        longitude: 0,
      })
    }

    const { gyms } = await sut.execute({ search: 'Gym', page: 2 })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({
        id: expect.any(String),
        title: 'Gym 21',
      }),
      expect.objectContaining({
        id: expect.any(String),
        title: 'Gym 22',
      }),
    ])
  })
})
