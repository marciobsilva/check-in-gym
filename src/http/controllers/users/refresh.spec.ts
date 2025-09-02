import request from 'supertest'
import { app } from '../../../app.js'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Refresh token e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh token', async () => {
    await request(app.server).post('/users').send({
      name: 'Márcio Silva',
      email: 'marciomcbs@gmail.com',
      password: '123456',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'marciomcbs@gmail.com',
      password: '123456',
    })

    const cookies = authResponse.get('Set-Cookie')
    const cookieArray = Array.isArray(cookies)
      ? cookies
      : cookies
        ? [cookies]
        : []

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookieArray)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
