import { beforeEach, describe, expect, it } from 'vitest'

import { RegisterGymService } from './register-gym.js'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository.js'

describe('RegisterGymService', () => {
  let registerGymService: RegisterGymService
  let inMemoryGymsRepository: InMemoryGymsRepository

  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    registerGymService = new RegisterGymService(inMemoryGymsRepository)
  })

  it('should be able to register a gym', async () => {
    const gymData = {
      title: 'Gym A',
      description: 'A great gym',
      phone: '123456789',
      latitude: 40.7128,
      longitude: -74.006,
    }

    const response = await registerGymService.execute(gymData)

    expect(response.gym).toHaveProperty('id')
  })
})
