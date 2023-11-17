import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

async function main() {
  await prisma.user.create({
    data: {
      first_name: 'admin',
      last_name: '',
      email: 'adminagendepet@email.com',
      password_hash: await hash('@admin123', 6),
      role: 'ADMIN',
      avatar: null,
      avatar_url: null,
      phone: '(19)9936-96358',
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
