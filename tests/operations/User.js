import { gql } from 'apollo-boost'

const createUser = gql`
  mutation($data: CreateUserInput!, $password: CreatePasswordInput!) {
    createUser(data: $data, password: $password) {
      id
      name
      email
    }
  }
`

const confirmEmail = gql`
  mutation($validationToken: String!) {
    confirmEmail(validationToken: $validationToken) {
      id
      name
      email
    }
  }
`

const getUsers = gql`
  query {
    users {
      id
      name
      email
    }
  }
`

const login = gql`
  mutation($data: LoginUserInput!) {
    login(data: $data) {
      token
      user {
        name
      }
    }
  }
`

const getProfile = gql`
  query {
    me {
      id
      name
      email
    }
  }
`

export { createUser, confirmEmail, login, getUsers, getProfile }
