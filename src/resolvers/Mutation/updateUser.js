import validatePassword from '../../utils/validatePassword'

const updateUser = async (parent, { data }, { prisma, request }, info) => {
  const userId = getUserId(request)

  if (typeof data.password === 'string') {
    data.password = await validatePassword(data.password, 'lolilol')
  }

  return prisma.mutation.updateUser(
    {
      where: {
        id: userId
      },
      data: data
    },
    info
  )
}

export { updateUser as default }
