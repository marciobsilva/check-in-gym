import type { Gym, Prisma } from 'generated/prisma/index.js'

export interface findManyNearbyParams {
  latitude: number
  longitude: number
}
export interface GymsRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>
  findById(gymId: string): Promise<Gym | null>
  searchMany(search: string, page: number): Promise<Gym[]>
  findManyNearby(params: findManyNearbyParams): Promise<Gym[]>
}
