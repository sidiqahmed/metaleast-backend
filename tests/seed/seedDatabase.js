import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import prisma from '../../src/prisma'
import users from './fixtures/User'

const seedDatabase = async () => {
  // Delete test data
  await prisma.mutation.deleteManyUsers()

  // Create users from fixtures
  for (let i = 0; i < users.length; i++) {
    const password = bcrypt.hashSync(users[i].input.password, 10)
    users[i].data = await prisma.mutation.createUser({
      data: { ...users[i].input, password }
    })
    users[i].jwt = jwt.sign(
      { userId: users[i].data.id },
      process.env.JWT_SECRET
    )
  }
}

export { seedDatabase as default }
