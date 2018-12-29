import bcrypt from 'bcryptjs'

import generateToken from '../../utils/generateToken'

const login = async (parent, args, { prisma }, info) => {
  const user = await prisma.query.user({
    where: {
      email: args.data.email
    }
  })

  if (!user) {
    throw new Error('Unable to login')
  }

  const isMatch = await bcrypt.compare(args.data.password, user.password)

  if (!isMatch) {
    throw new Error('Unable to login')
  }

  return {
    user,
    token: generateToken(user.id)
  }
}

export { login as default }
