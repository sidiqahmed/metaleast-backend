import bcrypt from 'bcryptjs'

import generateToken from '../../utils/generateToken'

const login = {
  async resolve(parent, { data }, { prisma }, info) {
    const user = await prisma.query.user(
      { where: { email: data.email } },
      `
      {
        id
        name
        email
        password
        enabled
        banned {
          id
          comment
          debanned
        }
        createdAt
        updatedAt
      }
    `
    )
    // Check if user exists
    if (!user) {
      throw new Error('Unable to login')
    }

    // Check password
    const isMatch = await bcrypt.compare(data.password, user.password)

    if (!isMatch) {
      throw new Error('Unable to login')
    }

    // Check if enabled
    if (!user.enabled) {
      throw new Error('User is not enabled')
    }

    // Check if banned
    if (user.banned !== null) {
      const debanned = new Date(user.banned.debanned)
      const now = new Date()

      // Check if banned expired
      if (debanned < now) {
        // If debanned, remove from database
        await prisma.mutation.deleteBanned({ where: { id: user.banned.id } })
      } else {
        throw new Error('User is banned')
      }
    }

    return {
      user,
      token: generateToken(user.id)
    }
  }
}

export { login as default }
