import { Prisma } from '../../generated/prisma/client.js'
import type { User } from '../../generated/prisma/client.js'

export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
}
