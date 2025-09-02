import type { CheckIn, Prisma } from 'generated/prisma/index.js'
import type { CheckInsRepository } from '../check-ins-repository.js'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = []

  async save(checkIn: CheckIn): Promise<CheckIn> {
    const index = this.items.findIndex((item) => item.id === checkIn.id)

    if (index !== -1) {
      this.items[index] = checkIn
    }

    return Promise.resolve(checkIn)
  }

  findById(checkInId: string): Promise<CheckIn | null> {
    const checkIn = this.items.find((item) => item.id === checkInId)
    return Promise.resolve(checkIn || null)
  }

  countByUserId(userId: string): Promise<number> {
    const count = this.items.filter((item) => item.user_id === userId).length
    return Promise.resolve(count)
  }

  async findCheckInsByUserId(userId: string, page: number): Promise<CheckIn[]> {
    const itemsByPage = 20
    return this.items
      .filter((item) => item.user_id === userId)
      .slice((page - 1) * itemsByPage, page * itemsByPage)
  }

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn: CheckIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }

    this.items.push(checkIn)

    return Promise.resolve(checkIn)
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('day')
    const endOfTheDay = dayjs(date).endOf('day')

    const checkIn = this.items.find(
      (item) =>
        item.user_id === userId &&
        item.created_at >= startOfTheDay.toDate() &&
        item.created_at <= endOfTheDay.toDate(),
    )

    return Promise.resolve(checkIn || null)
  }
}
