import request from 'supertest'
import { app } from '../../../app.js'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user.js'
import { prisma } from '@/lib/prisma.js'

describe('Create CheckIn e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a check in', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const gym = await prisma.gym.create({
      data: {
        title: 'Gym Force',
        latitude: 0,
        longitude: 0,
      },
    })

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/checkins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        userLatitude: 0,
        userLongitude: 0,
      })

    expect(response.statusCode).toEqual(201)
  })
})
