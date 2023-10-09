import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await prisma.user.create({
    data: {
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('12345678', 6),
      role: 'CLIENT',
      phone: '1196457852',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@example.com',
    password: '12345678',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
