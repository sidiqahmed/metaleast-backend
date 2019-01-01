const users = [
  {
    input: {
      name: 'Jérôme',
      email: 'jerome@meichelbeck.io',
      password: 'secretPassword',
      enabled: true
    }
  },
  {
    input: {
      name: 'Emilie',
      email: 'emilie@meichelbeck.io',
      password: 'secretPassword',
      enabled: false
    }
  },
  {
    input: {
      name: 'Sylvie',
      email: 'sylvie@meichelbeck.io',
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
