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
  name: 'New User',
  email: 'new@user.com',
  password: 'apskfn6dsjsjMPE',
  retypedPassword: 'apskfn6dsjsjMPE'
}

export { users as default, newUser }
