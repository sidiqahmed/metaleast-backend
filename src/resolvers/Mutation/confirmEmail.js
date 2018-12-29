import jwt from 'jsonwebtoken'

const confirmEmail = async (parent, { validationToken }, { prisma }, info) => {
  const userId = jwt.verify(validationToken, process.env.JWT_SECRET).userId

  const userAlreadyEnabled = await prisma.exists.User({
    id: userId,
    enabled: true
  })
  if (userAlreadyEnabled) {
    throw new Error('Email already confirmed')
  }

  await prisma.mutation.updateUser({
    where: { id: userId },
    data: { enabled: true }
  })

  return prisma.query.user({ where: { id: userId } }, info)
}

export { confirmEmail as default }
