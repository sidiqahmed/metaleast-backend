const isSuperadmin = (user) => {
  return user.role === 'SUPERADMIN'
}

export { isSuperadmin as default }
