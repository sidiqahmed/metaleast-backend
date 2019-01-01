import getUserId from '../../utils/getUserId'

const deleteUser = async (parent, { id }, { prisma, request }, info) => {
  // Get user ID from token (will throw an error if unauthenticated)
  const userId = getUserId(request)
  const connectedUser = await prisma.query.user({ where: { id: userId } })

  // If id is not given, delete connected user
  if (!id) {
    return prisma.mutation.deleteUser(
      {
        where: {
          id: userId
        }
      },
      info
    )
  }

  // If id is given and connected user is admin, delete given user
  const isAdmin = ['ADMIN', 'SUPERADMIN'].indexOf(connectedUser.role) > -1
  if (isAdmin) {
    return prisma.mutation.deleteUser(
      {
        where: {
          id
        }
      },
      info
    )
  }

  // If id is given and connected user is not admin, throw an error
  throw new Error('You cannot delete a user')
}

export { deleteUser as default }
