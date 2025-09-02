import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository.js'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository.js'
import { it, describe, expect, beforeEach, vi, afterAll } from 'vitest'
import { CheckInService } from './check-in.js'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInService

beforeEach(() => {
  checkInsRepository = new InMemoryCheckInsRepository()
  gymsRepository = new InMemoryGymsRepository()
  sut = new CheckInService(checkInsRepository, gymsRepository)

  gymsRepository.create({
    id: 'gym-1',
    title: 'Gym 1',
    description: 'Description 1',
    phone: '123456789',
    latitude: 0,
    longitude: 0,
  })

  vi.useFakeTimers()
})

afterAll(() => {
  vi.useRealTimers()
})

describe('Check In Service', () => {
  it('should be able to create a check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user-1',
      gymId: 'gym-1',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on the same day', async () => {
    vi.setSystemTime(new Date(2025, 8, 21, 8, 37, 0))

    await sut.execute({
      userId: 'user-1',
      gymId: 'gym-1',
      userLatitude: 0,
      userLongitude: 0,
    })

    await expect(
      sut.execute({
        userId: 'user-1',
        gymId: 'gym-1',
        userLatitude: 0,
        userLongitude: 0,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able check in on diferent days', async () => {
    vi.setSystemTime(new Date(2025, 8, 21, 8, 37, 0))

    await sut.execute({
      userId: 'user-1',
      gymId: 'gym-1',
      userLatitude: 0,
      userLongitude: 0,
    })

    vi.setSystemTime(new Date(2025, 8, 22, 8, 37, 0))

    await expect(
      sut.execute({
        userId: 'user-1',
        gymId: 'gym-1',
        userLatitude: 0,
        userLongitude: 0,
      }),
    ).resolves.toBeTruthy()
  })

  it('should not be able check in on distante gym', async () => {
    vi.setSystemTime(new Date(2025, 8, 22, 8, 37, 0))
    gymsRepository.create({
      id: 'gym-2',
      title: 'Gym 2',
      description: 'Description 2',
      phone: '987654321',
      latitude: -7.0436017,
      longitude: -35.6200484,
    })

    await expect(
      sut.execute({
        userId: 'user-1',
        gymId: 'gym-2',
        userLatitude: -7.0554085,
        userLongitude: -35.7516062,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
