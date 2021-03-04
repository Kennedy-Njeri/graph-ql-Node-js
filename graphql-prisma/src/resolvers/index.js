import { extractFragmentReplacements } from 'prisma-binding'
import Query from './Query'
import Comment from './Comment'
import Mutation from './Mutation'
import Post from './Post'
import User from './User'
import Subscription from './Subscription'


const resolvers = {
    Query,
    Subscription,
    Comment,
    User,
    Post,
    Mutation,
}

const fragmentReplacements = extractFragmentReplacements(resolvers)

export { resolvers, fragmentReplacements }