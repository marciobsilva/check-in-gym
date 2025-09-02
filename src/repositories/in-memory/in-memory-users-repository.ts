import type { Prisma, User } from 'generated/prisma/index.js'
import type { UsersRepository } from '../users-repository.js'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user: User = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.items.push(user)

    return Promise.resolve(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email)
    return Promise.resolve(user || null)
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === id)
    return Promise.resolve(user || null)
  }
}
