import { it, describe, expect, beforeEach } from 'vitest'
import { RegisterService } from './register.js'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { UserAlreadyExistsError } from './errors/user-already-exists-error.js'

let usersRepository: InMemoryUsersRepository
let sut: RegisterService

describe('Register Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterService(usersRepository)
  })

  it('should be able register user', async () => {
    const { user } = await sut.execute({
      email: 'john.doe@example.com',
      name: 'John Doe',
      password: 'password123',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      email: 'john.doe@example.com',
      name: 'John Doe',
      password: 'password123',
    })

    const isPasswordCorrectHashed = await compare(
      'password123',
      user.password_hash,
    )

    expect(isPasswordCorrectHashed).toBe(true)
  })

  it('should not allow duplicate email registration', async () => {
    const email = 'john.doe@example.com'

    await sut.execute({
      email,
      name: 'John Doe',
      password: 'password123',
    })

    await expect(
      sut.execute({
        email,
        name: 'John Doe',
        password: 'password123',
      }),
    ).rejects.instanceOf(UserAlreadyExistsError)
  })
})
