import validatePassword from '../../utils/validatePassword'

const updateUser = async (parent, args, { prisma, request }, info) => {
  const userId = getUserId(request)

  if (typeof args.data.password === 'string') {
    args.data.password = await validatePassword(args.data.password, 'lolilol')
  }

  return prisma.mutation.updateUser(
    {
      where: {
        id: userId
      },
      data: args.data
    },
    info
  )
}

export { updateUser as default }
