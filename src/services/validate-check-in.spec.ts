import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository.js'
import { it, describe, expect, beforeEach, vi, afterAll } from 'vitest'
import { ValidateCheckInService } from './validate-check-in.js'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'
import { LateCheckInValidationsError } from './errors/late-check-in-validation-error.js'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInService

beforeEach(() => {
  checkInsRepository = new InMemoryCheckInsRepository()
  sut = new ValidateCheckInService(checkInsRepository)

  vi.useFakeTimers()
})

afterAll(() => {
  vi.useRealTimers()
})

describe('Validate check In Service', () => {
  it('should be able to create a check in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      id: 'check-in-1',
      user_id: 'user-1',
      gym_id: 'gym-1',
    })

    await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(createdCheckIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.items[0]?.validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate a inexistant check in', async () => {
    await expect(
      sut.execute({
        checkInId: 'inexistant-check-in',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate the check in after 20 minutes of its creations', async () => {
    vi.setSystemTime(new Date(2024, 0, 1, 13, 40))

    const createdCheckIn = await checkInsRepository.create({
      user_id: 'user-1',
      gym_id: 'gym-1',
    })

    const twentyOneMinutesInMs = 1000 * 60 * 21
    vi.advanceTimersByTime(twentyOneMinutesInMs)

    await expect(
      sut.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidationsError)
  })
})
