import { GraphQLServer, PubSub } from 'graphql-yoga'
import db from './db'
import {resolvers, fragmentReplacements} from "./resolvers/index";
import prisma from './prisma'





export const pubSub = new PubSub()





const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: resolvers,
    fragmentReplacements,
    context(request) {
        //console.log(request.request.headers)
        return {
            db: db,
            pubSub: pubSub,
            prisma,
            request
        }
    },
})
server.start(() => console.log('Server is running on localhost:4000'))
















//let months = ['Jan', 'March', 'April', 'June'];

//months.splice(1, 0, 'Feb');
// inserts at index 1
//console.log(months);
// expected output: Array ["Jan", "Feb", "March", "April", "June"]


//let removed = months.splice(1, 1);
// replaces 1 element at index 1
//console.log(removed);

//expected output: Array ["Feb"]













// import location, { message, getGreeting } from "./myModule";
// import add, {subtract} from "./calculateMath";
//
//
// console.log(getGreeting('Kennedy'))
// console.log(message)
// console.log(location)
//
// console.log(add(4, 5))
// console.log(subtract(9, 5))


// add(numbers: [Float!]!): Float!
//     greeting(name: String): String!
//
//
// add(parent, args, ctx, info) {
//     if (args.numbers.length === 0) {
//         return 0
//     }
//
//     return args.numbers.reduce((acc, current) => {
//         return acc + current
//     }, 0)
// },
// greeting (parent, args, ctx, info) {
//     if (args.name) {
//         return `Hello, ${args.name}`
//     } else {
//         return "Hello!"
//     }
// } ,