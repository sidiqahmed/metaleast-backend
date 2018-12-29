import bcrypt from 'bcryptjs'
import passwordCheck from 'zxcvbn'

const validatePassword = (password, retypedPassword) => {
  if (password !== retypedPassword) {
    throw new Error("Passwords don't match")
  }

  const passwordStrength = passwordCheck(password)

  if (passwordStrength.score < 4) {
    throw new Error(
      `Password is not strong enough (${passwordStrength.score}/4) ${
        passwordStrength.feedback.warning
      }`
    )
  }

  return bcrypt.hash(password, 10)
}

export { validatePassword as default }
