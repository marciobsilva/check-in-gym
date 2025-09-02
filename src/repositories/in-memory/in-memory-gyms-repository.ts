import type { Gym, Prisma } from 'generated/prisma/index.js'
import type {
  GymsRepository,
  findManyNearbyParams,
} from '../gyms-repository.js'
import { randomUUID } from 'node:crypto'
import { Decimal } from '@prisma/client/runtime/library.js'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates.js'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async findManyNearby(params: findManyNearbyParams): Promise<Gym[]> {
    const { latitude, longitude } = params

    const gyms = this.items.filter((gym) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude, longitude },
        {
          latitude: gym.latitude.toNumber(),
          longitude: gym.longitude.toNumber(),
        },
      )
      return distance < 10 // Até 10 kilometros
    })

    return Promise.resolve(gyms)
  }

  searchMany(search: string, page: number): Promise<Gym[]> {
    const gyms = this.items
      .filter((gym) => gym.title.includes(search))
      .slice((page - 1) * 20, page * 20)
    return Promise.resolve(gyms)
  }

  create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym: Gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description || null,
      phone: data.phone || null,
      latitude: new Decimal(Number(data.latitude)),
      longitude: new Decimal(Number(data.longitude)),
    }

    this.items.push(gym)
    return Promise.resolve(gym)
  }

  async findById(gymId: string) {
    const gym = this.items.find((item) => item.id === gymId)
    return Promise.resolve(gym || null)
  }
}
