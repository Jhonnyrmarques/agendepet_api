import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'

describe('User Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user profile', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const profileUserResponse = await request(app.server)
      .get('/profile')
      .set('Authorization', `Bearer ${token}`)

    expect(profileUserResponse.statusCode).toBe(200)
    expect(profileUserResponse.body.user).toEqual(
      expect.objectContaining({
        email: 'johndoe@example.com',
      }),
    )
  })
})
