const users = async (parent, { query }, { prisma }, info) => {
  const opArgs = {
    where: {
      enabled: true
    }
  }
  if (query) {
    opArgs.where = {
      OR: [
        {
          name_contains: query
        }
      ]
    }
  }

  return prisma.query.users(opArgs, info)
}

export { users as default }
