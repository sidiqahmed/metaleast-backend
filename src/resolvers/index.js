import { extractFragmentReplacements } from 'prisma-binding'
import Query from './Query/index'
import Mutation from './Mutation/index'
import Subscription from './Subscription/index'
import User from './User/index'

const resolvers = {
  Query,
  Mutation,
  // Subscription,
  User
}

const fragmentReplacements = extractFragmentReplacements(resolvers)

export { resolvers, fragmentReplacements }
