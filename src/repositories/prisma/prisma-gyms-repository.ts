import { prisma } from '@/lib/prisma.js'
import { Prisma, type Gym } from 'generated/prisma/client.js'
import type {
  findManyNearbyParams,
  GymsRepository,
} from '../gyms-repository.js'

export class PrismaGymsRepository implements GymsRepository {
  async create(data: Prisma.GymCreateInput) {
    return await prisma.gym.create({ data })
  }

  async findById(gymId: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id: gymId,
      },
    })

    return gym
  }

  async searchMany(search: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: search,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return gyms
  }

  async findManyNearby({ latitude, longitude }: findManyNearbyParams) {
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * 
      FROM gyms
      WHERE 
        6371 * ACOS(
          COS(RADIANS(${latitude})) * COS(RADIANS(latitude)) *
          COS(RADIANS(longitude) - RADIANS(${longitude})) +
          SIN(RADIANS(${latitude})) * SIN(RADIANS(latitude))
        ) <= 10;
    `

    return gyms
  }
}
