import bcrypt from 'bcryptjs'

import generateToken from '../../utils/generateToken'

const login = async (parent, { data }, { prisma }, info) => {
  const user = await prisma.query.user({
    where: {
      email: data.email
    }
  })

  if (!user) {
    throw new Error('Unable to login')
  }

  const isMatch = await bcrypt.compare(data.password, user.password)

  if (!isMatch) {
    throw new Error('Unable to login')
  }

  return {
    user,
    token: generateToken(user.id)
  }
}

export { login as default }
