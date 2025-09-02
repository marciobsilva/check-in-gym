import { prisma } from '@/lib/prisma.js'
import { Prisma } from 'generated/prisma/client.js'
import type { UsersRepository } from '../users-repository.js'

export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    return user
  }

  async create(data: Prisma.UserCreateInput) {
    return await prisma.user.create({ data })
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return user
  }
}
