import validatePassword from '../../utils/validatePassword'
import sendValidationEmail from '../../utils/sendValidationEmail'
import generateToken from '../../utils/generateToken'

const createUser = async (parent, { data, password }, { prisma }, info) => {
  // Validate password
  data.password = await validatePassword(
    password.newPassword,
    password.retypedPassword
  )

  const newUser = await prisma.mutation.createUser({ data }, info)

  // Generate validation token
  const validationToken = generateToken(newUser.id, '7 days')

  // Send an email with the validation token
  if (process.env.SEND_EMAIL) {
    sendValidationEmail(newUser, validationToken)
  }

  return newUser
}

export { createUser as default }
