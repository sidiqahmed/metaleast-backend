const deleteUser = async (parent, args, { prisma, request }, info) => {
  const userId = getUserId(request)

  return prisma.mutation.deleteUser(
    {
      where: {
        id: userId
      }
    },
    info
  )
}

export { deleteUser as default }
