import { describe, it, expect } from 'vitest'
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository.js'
import { FetchNearbyGymsService } from './fetch-nearby-gyms.js'

describe('Fetch nearby gyms service', () => {
  it('should be able to fetch nearby gyms', async () => {
    const inMemoryGymsRepository = new InMemoryGymsRepository()
    const sut = new FetchNearbyGymsService(inMemoryGymsRepository)

    await inMemoryGymsRepository.create({
      title: 'Near Gym 1',
      description: 'Description 1',
      phone: '123456789',
      latitude: -7.0554085,
      longitude: -35.7516062,
    })

    await inMemoryGymsRepository.create({
      title: 'Far Gym 2',
      description: 'Description 2',
      phone: '987654321',
      latitude: -7.2346301,
      longitude: -35.8791421,
    })

    const { gyms } = await sut.execute({
      userLatitude: -7.0554085,
      userLongitude: -35.7516062,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        id: expect.any(String),
        title: 'Near Gym 1',
      }),
    ])
  })
})
