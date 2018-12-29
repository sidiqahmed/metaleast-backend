import createUser from './createUser'
import confirmEmail from './confirmEmail'
import login from './login'
import updateUser from './updateUser'
import deleteUser from './deleteUser'

const Mutation = {
  createUser,
  confirmEmail,
  login,
  updateUser,
  deleteUser
}

export { Mutation as default }
