import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authentication User (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/users').send({
      first_name: 'Sebastiana',
      last_name: 'Luna Caroline Nogueira',
      email: 'sebastiana@email.com',
      password_hash: '12345678',
      phone: '14988312962',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'sebastiana@email.com',
      password: '12345678',
    })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
