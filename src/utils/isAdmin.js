const isAdmin = (user) => {
  return ['SUPERADMIN', 'ADMIN'].indexOf(user.role) > -1
}

export { isAdmin as default }
