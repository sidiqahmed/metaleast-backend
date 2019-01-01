import bcrypt from 'bcryptjs'

import getUserId from '../../utils/getUserId'
import validatePassword from '../../utils/validatePassword'
import isAdmin from '../../utils/isAdmin'
import isSuperadmin from '../../utils/isSuperadmin'

const updateUser = async (
  parent,
  { id, currentPassword, data, password },
  { prisma, request },
  info
) => {
  if (!data) {
    data = {}
  }
  // Get user ID from token (will throw an error if unauthenticated)
  const userId = getUserId(request)
  const connectedUser = await prisma.query.user({ where: { id: userId } })

  // Whoever is updating, they should give their password
  const isMatch = await bcrypt.compare(currentPassword, connectedUser.password)
  if (!isMatch) {
    throw new Error('Unable to update user')
  }

  // If id is not given, update connected user
  if (!id) {
    // Check if password has changed
    if (password) {
      data.password = await validatePassword(
        password.newPassword,
        password.retypedPassword
      )
    }

    // A user cannot update their own role!
    data.role = connectedUser.role

    return prisma.mutation.updateUser({ where: { id: userId }, data }, info)
  }

  // If id is given and connected user is admin, update given user
  const userToUpdate = await prisma.query.user({ where: { id } })
  if (isAdmin(connectedUser)) {
    // Admin can't update user password

    // Nobody can change role to superadmin
    if (isSuperadmin(data)) {
      data.role = userToUpdate.role
    }

    if (!isSuperadmin(connectedUser)) {
      // Admin (not superadmin) can't give or take away admin rights
      if (isAdmin(userToUpdate) || isAdmin(data)) {
        data.role = userToUpdate.role
      }
      // Admin can't update admin or superadmin
      if (isAdmin(userToUpdate)) {
        data.name = userToUpdate.name
        data.email = userToUpdate.email
        data.role = userToUpdate.role
      }
    }

    return prisma.mutation.updateUser({ where: { id }, data }, info)
  }

  // If id is given and connected user is not admin, throw an error
  throw new Error('You cannot update a user')
}

export { updateUser as default }
