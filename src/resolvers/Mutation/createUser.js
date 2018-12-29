import validatePassword from '../../utils/validatePassword'
import sendValidationEmail from '../../utils/sendValidationEmail'
import generateToken from '../../utils/generateToken'

const createUser = async (parent, { data }, { prisma }, info) => {
  // Validate password
  const password = await validatePassword(data.password, data.retypedPassword)

  const { retypedPassword, ...newData } = data

  const newUser = await prisma.mutation.createUser(
    { data: { ...newData, password } },
    info
  )

  // Generate validation token
  const validationToken = generateToken(newUser.id, '7 days')

  // Send an email with the validation token
  if (process.env.SEND_EMAIL) {
    sendValidationEmail(newUser, validationToken)
  }

  return newUser
}

export { createUser as default }
