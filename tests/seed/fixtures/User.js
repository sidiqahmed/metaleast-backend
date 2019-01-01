// Users should have at least 4 users
// Users should have at least 1 enabled user
// Users should have at least 1 disabled user
// User should have 1 superadmin, 1 admin, and at least 2 commentators and/or writers

const users = [
  {
    input: {
      role: 'SUPERADMIN',
      name: 'Jérôme',
      email: 'jerome@meichelbeck.io',
      password: 'secretPassword',
      enabled: true
    }
  },
  {
    input: {
      role: 'ADMIN',
      name: 'Emilie',
      email: 'emilie@meichelbeck.io',
      password: 'secretPassword',
      enabled: false
    }
  },
  {
    input: {
      role: 'COMMENTATOR',
      name: 'Sylvie',
      email: 'sylvie@meichelbeck.io',
      password: 'secretPassword',
      enabled: true
    }
  },
  {
    input: {
      role: 'WRITER',
      name: 'Patricia',
      email: 'patricia@meichelbeck.io',
      password: 'secretPassword',
      enabled: true
    }
  }
]

const newUser = {
  data: {
    name: 'New User',
    email: 'new@user.com'
  },
  password: {
    newPassword: 'apskfn6dsjsjMPE',
    retypedPassword: 'apskfn6dsjsjMPE'
  }
}

export { users as default, newUser }
