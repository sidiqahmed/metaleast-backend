import getUserId from '../../utils/getUserId'
import isAdmin from '../../utils/isAdmin'
import isSuperadmin from '../../utils/isSuperadmin'

const deleteUser = async (parent, { id }, { prisma, request }, info) => {
  // Get user ID from token (will throw an error if unauthenticated)
  const userId = getUserId(request)
  const connectedUser = await prisma.query.user({ where: { id: userId } })

  // If id is not given, delete connected user
  if (!id) {
    // Superadmin cannot delete themself!
    if (isSuperadmin(connectedUser)) {
      throw new Error('Unable to delete superadmin')
    }

    return prisma.mutation.deleteUser(
      {
        where: {
          id: userId
        }
      },
      info
    )
  }

  const userToDelete = await prisma.query.user({ where: { id } })

  // Nobody can delete superadmin
  if (isSuperadmin(userToDelete)) {
    throw new Error('Unable to delete superadmin')
  }

  // If id is given and connected user is admin, delete given user
  if (isAdmin(connectedUser)) {
    // Admin cannot delete other admin
    if (!isSuperadmin(connectedUser) && isAdmin(userToDelete)) {
      throw new Error('Unable to delete admin')
    }
    return prisma.mutation.deleteUser({ where: { id } }, info)
  }

  // If id is given and connected user is not admin, throw an error
  throw new Error('Unable to delete user')
}

export { deleteUser as default }
