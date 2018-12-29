import 'cross-fetch/polyfill'

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import prisma from '../src/prisma'
import getClient from './utils/getClient'
import users, { newUser } from './seed/fixtures/User'
import seedDatabase from './seed/seedDatabase'
import {
  createUser,
  confirmEmail,
  getUsers,
  login,
  getProfile
} from './operations/User'

const client = getClient()

beforeEach(seedDatabase)

test('Should create a new user', async () => {
  const variables = {
    data: newUser
  }

  const response = await client.mutate({
    mutation: createUser,
    variables
  })

  const userId = response.data.createUser.id

  // Fetch new user in db
  const createdUser = await prisma.query.user({
    where: { id: userId }
  })

  // Check values stores in db
  const passwordMatch = bcrypt.compareSync(
    newUser.password,
    createdUser.password
  )

  expect(createdUser.name).toBe(newUser.name)
  expect(createdUser.email).toBe(newUser.email)
  expect(passwordMatch).toBe(true)
  expect(createdUser.enabled).toBe(false)
})

test('Should enable user if valid token', async () => {
  const userToActivate = users.find((user) => !user.input.enabled)

  if (!userToActivate) {
    throw new Error('A least one user must be disabled in your fixtures')
  }

  const variables = {
    validationToken: userToActivate.jwt
  }

  const response = await client.mutate({ mutation: confirmEmail, variables })
  const activatedUser = response.data.confirmEmail
  const userIsActivated = await prisma.exists.User({
    id: userToActivate.data.id,
    enabled: true
  })

  expect(activatedUser.id).toBe(userToActivate.data.id)
  expect(userIsActivated).toBe(true)
})

test('Should login with corret credentials', async () => {
  const variables = {
    data: {
      email: users[1].input.email,
      password: users[1].input.password
    }
  }

  const response = await client.mutate({ mutation: login, variables })
  const { user, token } = response.data.login

  const userId = jwt.verify(token, process.env.JWT_SECRET).userId

  expect(user.name).toBe(users[1].data.name)
  expect(userId).toBe(users[1].data.id)
})

test('Should not login with bad credentials', async () => {
  const variables = {
    data: {
      email: users[0].input.email,
      password: users[0].input.password.slice(1)
    }
  }

  await expect(client.mutate({ mutation: login, variables })).rejects.toThrow()
})

test('Should not signup user with invalid (not strong enough) password', async () => {
  const variables = {
    data: {
      name: 'Andrew',
      email: 'andrew@example.com',
      password: 'password',
      retypedPassword: 'password'
    }
  }

  await expect(
    client.mutate({ mutation: createUser, variables })
  ).rejects.toThrow()
})

test("Should not signup user with invalid retypedPassword (doesn't match with password)", async () => {
  const variables = {
    data: {
      name: 'Andrew',
      email: 'andrew@example.com',
      password: 'pe_c52C?CS86*efs',
      retypedPassword: 'pe_c52C?CS86efs'
    }
  }

  await expect(
    client.mutate({ mutation: createUser, variables })
  ).rejects.toThrow()
})

test('Should expose enabled user profiles', async () => {
  const response = await client.query({ query: getUsers })
  const fetchedUsers = response.data.users

  const expectedUsers = users.filter((user) => user.input.enabled)

  expect(fetchedUsers.length).toBe(expectedUsers.length)

  for (let i = 0; i < expectedUsers.length; i++) {
    expect(fetchedUsers[i].id).toBe(expectedUsers[i].data.id)
    expect(fetchedUsers[i].name).toBe(expectedUsers[i].data.name)
    expect(fetchedUsers[i].email).toBe(null)
  }
})

test('Should fetch user profile', async () => {
  const client = getClient(users[0].jwt)
  const { data } = await client.query({ query: getProfile })

  expect(data.me.id).toBe(users[0].data.id)
  expect(data.me.name).toBe(users[0].data.name)
  expect(data.me.email).toBe(users[0].data.email)
})
