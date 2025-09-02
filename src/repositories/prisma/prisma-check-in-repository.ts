import { prisma } from '@/lib/prisma.js'
import { Prisma, type CheckIn } from 'generated/prisma/client.js'
import type { CheckInsRepository } from '../check-ins-repository.js'
import dayjs from 'dayjs'

export class PrismaCheckInRepository implements CheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    })

    return checkIn
  }

  async save(checkIn: CheckIn) {
    return await prisma.checkIn.update({
      where: {
        id: checkIn.id,
      },
      data: checkIn,
    })
  }

  findById(checkInId: string) {
    return prisma.checkIn.findUnique({
      where: {
        id: checkInId,
      },
    })
  }

  findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('day')
    const endOfTheDay = dayjs(date).endOf('day')

    return prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    })
  }

  findCheckInsByUserId(userId: string, page: number) {
    const checkIns = prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return checkIns
  }

  async countByUserId(userId: string) {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    })

    return count
  }
}
