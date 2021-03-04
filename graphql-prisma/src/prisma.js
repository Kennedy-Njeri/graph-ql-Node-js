import { Prisma } from "prisma-binding";
import {fragmentReplacements} from "./resolvers/index";


const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466',
    secret: 'myAppIsBetter',
    fragmentReplacements
})


export {prisma as default}

// prisma.query prisma.mutation prisma.subscription prisma.exists

// prisma.query.users(null, '{ id name posts { id title } }').then((data) => {
//     console.log(JSON.stringify(data, undefined, 2))
// }).catch((err) => {
//     console.log(err)
// })

// prisma.query.comments(null, '{ id text author { id name } }').then((data) => {
//     console.log(JSON.stringify(data, undefined, 2))
// }).catch((err) => {
//     console.log(err)
// })


// prisma.mutation.createPost({
//     data: {
//         title: "Graphql server live 101",
//         body: "we are using prisma for the project 1",
//         published: false,
//         author: {
//             connect: {
//                 id: "ckjvnyn9e00zs0753y4kpqy5d"
//             }
//         }
//     }
// }, '{ id title body published }').then((data) => {
//     console.log(data)
//     return prisma.query.users(null, '{ id name posts { id title } }')
// }).then((data) => {
//     console.log(JSON.stringify(data, undefined, 2))
// })


// prisma.mutation.updatePost({
//     where: {
//         id: "ckjy8tp8j03n70753wmphznw3"
//     },
//     data: {
//         body: "Graphql server live 205"
//     }
// }, '{ id }').then((data) => {
//     return prisma.query.posts(null, '{id title body, published}')
// }).then(data => {
//     console.log(data)
// })