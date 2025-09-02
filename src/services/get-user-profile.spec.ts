import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { it, describe, expect, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { GetUserProfileService } from './get-user-profile.js'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileService

describe('Get User Profile Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileService(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user: fetchedUser } = await sut.execute({
      userId: user.id,
    })

    expect(fetchedUser.id).toEqual(user.id)
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(
      sut.execute({
        userId: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
