const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
import getUserId from '../utils/getUserId'



const Mutation = {
    async createUser(parent, args, { db, prisma } = context, info) {

        if(args.data.password.length < 8) {
            throw new Error("Password must be 8 characters or longer")
        }

        const  password = await bcrypt.hash(args.data.password, 10)



        const user = prisma.mutation.createUser({ data: {
            ...args.data,
                password: password
            }})


        return {
            user,
            token: jwt.sign({ userId: user.id}, 'itscool')
        }


        // const emailTaken = await prisma.exists.User({email: args.data.email})
        //
        //
        // if(emailTaken) {
        //     throw new Error("That email is Taken!")
        // }

        // const emailTaken = db.users.some((user) => {
        //     return user.email === args.data.email
        // })
        //
        // if(emailTaken) {
        //     throw new Error("That email is Taken!")
        // }
        //
        // // b4 use of the spread
        // // const user = {
        // //     id: uuidv4(),
        // //     name: args.name,
        // //     email: args.email,
        // //     age: args.age
        // // }
        //
        // const user = {
        //     id: uuidv4(),
        //     ...args.data
        // }
        //
        // db.users.push(user)
        //
        // return user

        //console.log(args)
    },
    async login(parent, args, { prisma } = context, info) {
        const user = await prisma.query.user({
            where: {
                email: args.data.email
            }
        })

        if (!user){
            throw new Error("Unable to login")
        }

        const isMatch = await bcrypt.compare(args.data.password, user.password)

        if (!isMatch){
            throw new Error('Unable to login')
        }

        return {
            user,
            token: jwt.sign({ userId: user.id}, 'itscool')
        }

    },
    async deleteUser(parent, args, { db, prisma, request } = context, info) {

        const userId = getUserId(request)


        // const  userExists = await prisma.exists.User({ id: args.id })
        //
        // if (!userExists) {
        //     throw new Error("User not Found")
        // }

        return await prisma.mutation.deleteUser({
            where: {
                id: userId
            }
        }, info)


        //  method returns the index of the first element in the array that satisfies the provided testing function. Otherwise, it returns -1
        // const userIndex = db.users.findIndex((user) => {
        //     return user.id === args.id
        // })
        //
        // if (userIndex === -1) {
        //     throw new Error("User not found")
        // }
        //
        // // returns an array of an object i.e one object deleted
        // const  deletedUsers = db.users.splice(userIndex, 1)
        //
        //
        // db.posts = db.posts.filter((post) => {
        //     const match = post.author === args.id
        //
        //     if (match) {
        //         db.comments = db.comments.filter((comment) => {
        //             return comment.post !== post.id
        //         })
        //     }
        //
        //     // return true when we did not find a match
        //     return !match
        // })
        //
        // // removes comments from other posts from other users post
        // db.comments = db.comments.filter((comment) => {
        //     return comment.author !== args.id
        // })
        //
        //
        // return deletedUsers[0]

    },
    async updateUser(parent, args, { db, prisma, request } = context, info) {

        const userId = getUserId(request)

        return await prisma.mutation.updateUser({
            where: {
                id: userId
            },
            data: args.data
        }, info)

        // const { id, data } = args
        //
        // const user = db.users.find((user) => {
        //     return user.id === id
        // })
        //
        //
        // if(!user) {
        //     throw new Error("User not found")
        // }
        //
        //
        // if (typeof data.email === 'string') {
        //     const emailTaken = db.users.some((user) => {
        //         return user.email === data.email
        //     })
        //
        //     if (emailTaken) {
        //         throw new Error("Email is taken")
        //     }
        //
        //      user.email = data.email
        // }
        //
        // if (typeof data.name === 'string') {
        //     user.name = data.name
        // }
        //
        // if (typeof data.age !== 'undefined'){
        //     user.age = data.age
        // }
        //
        // return user

    },
    async createPost(parent, args, { prisma, request } = context, info) {

        const userId = getUserId(request)

        return prisma.mutation.createPost({
            data: {
                title: args.data.title,
                body: args.data.body,
                published: args.data.published,
                author: {
                    connect: {
                        id: userId
                    }
                }
            }
        }, info)

        // some() method tests whether at least one element in the array passes the test implemented by the provided function // returns a boolean
        // const userExists = db.users.some((user) => {
        //     return user.id === args.data.author
        // })
        //
        // if(!userExists) {
        //     throw new Error("User does not Exist!")
        // }
        //
        // const post = {
        //     id: uuidv4(),
        //     ...args.data
        // }
        //
        // db.posts.push(post)
        //
        // if(args.data.published) {
        //     pubSub.publish('post', { post: {
        //         mutation: 'CREATED',
        //         data: post
        //         }})
        // }
        //
        // return post

    },
    async deletePost(parent, args, {  pubSub, prisma, request } = context, info) {

        const userId = getUserId(request)

        const postExists = await prisma.exists.Post({
            id: args.id,
            author: {
                id: userId
            }
        })

        if (!postExists){
           throw new Error("Unable to delete post")
        }

        return await prisma.mutation.deletePost({
            where: {
                id: args.id
            }
        }, info)

        // const postIndex = db.posts.findIndex((post) => {
        //     return post.id === args.id
        // })
        //
        // if (postIndex === -1) {
        //     throw new Error("The post does not exist")
        // }
        //
        // const deletedPosts = db.posts.splice(postIndex, 1)
        //
        // db.comments = db.comments.filter((comment) => {
        //     return comment.post !== args.id
        // })
        //
        // if (deletedPosts[0].published) {
        //     pubSub.publish('post', {
        //         post: {
        //             mutation: 'DELETED',
        //             data: deletedPosts[0]
        //         }
        //     })
        // }
        //
        // return deletedPosts[0]
    },
    async updatePost (parent, args, { db, pubSub, prisma, request } = context, info) {

        const userId = getUserId(request)

        const postExists = await prisma.exists.Post({
            id: args.id,
            author: {
                id: userId
            }
        })

        if (!postExists){
            throw new Error("Unable to update post")
        }

        return prisma.mutation.updatePost({
            where: {
                id: args.id
            },
            data: args.data
        })
        // const { id, data } = args
        //
        // const post = db.posts.find((post) => {
        //     return post.id === id
        // })
        //
        // const originalPost = {...post}
        //
        // if (!post) {
        //     throw new Error("Post not found")
        // }
        //
        // if (typeof data.title === 'string') {
        //     post.title = data.title
        // }
        //
        // if (typeof data.body === 'string') {
        //     post.body = data.body
        // }
        //
        // if (typeof data.published === 'boolean') {
        //     post.published = data.published
        //
        //     // was the post originally pub and now not published
        //     if (originalPost.published && !post.published) {
        //         // deleted event
        //         pubSub.publish('post', {
        //             post: {
        //                 mutation: 'DELETED',
        //                 data: originalPost
        //             }
        //         })
        //     } else if (!originalPost.published && post.published) {
        //         // was the post originally pub and now not published
        //         // created event
        //         pubSub.publish('post', {
        //             post: {
        //                 mutation: 'CREATED',
        //                 data: data
        //             }
        //         })
        //     }
        // } else if(post.published) {
        //     // if its being updated and the published value is not changed
        //     // updated
        //     pubSub.publish('post', {
        //         post: {
        //             mutation: 'UPDATED',
        //             data: post
        //         }
        //     })
        // }
        //
        // return post

    },
    createComment(parent, args, { db, pubSub, prisma, request } = context, info) {

        const userId = getUserId(request)

        return prisma.mutation.createComment({
            data: {
                text: args.data.text,
                author: {
                    connect: {
                        id: userId
                    }
                },
                post: {
                    connect: {
                        id: args.data.post
                    }
                }
            }
        }, info)


        // const userExists = db.users.some((user) => {
        //     return user.id === args.data.author
        // })
        //
        // const postsExists = db.posts.some((post) => {
        //     return post.id == args.data.post && post.published
        // })
        //
        // if (!userExists || !postsExists) {
        //     throw new Error("Unable to find user and post")
        // }
        //
        // const comment = {
        //     id: uuidv4(),
        //     ...args.data
        // }
        //
        // db.comments.push(comment)
        // // we provide the channel name, and actual data we are trying to publish, {subscription name: value to come back}
        // pubSub.publish(`comment ${args.data.post}`, { comment: {
        //     mutation: "CREATED",
        //     data: comment
        //
        //     }})
        //
        // return comment
    },
    async deleteComment(parent, args, { pubSub, prisma, request } = context, info) {

        const userId = getUserId(request)

        const commentExists = await prisma.exists.Comment({
            id: args.id,
            author: {
                id: userId
            }
        })

        if (!commentExists){
            throw new Error("Unable to delete Comment")
        }

        return prisma.mutation.deleteComment({
            where:{
                id: args.id
            },
            data: args.data
        }, info)

        // const commentIndex = db.comments.findIndex((comment) => {
        //     return comment.id === args.id
        // })
        //
        // if (commentIndex === -1) {
        //     throw new Error("Comment not found")
        // }
        //
        // const deletedComment = db.comments.splice(commentIndex, 1)
        //
        // pubSub.publish(`comment ${deletedComment[0].post}`, {
        //     comment: {
        //         mutation: 'DELETED',
        //         data: deletedComment[0]
        //     }
        // })
        //
        // return deletedComment[0]

    },
    async updateComment(parent, args, { db, pubSub, prisma, request } = context, info) {

        const userId = getUserId(request)

        const commentExists = await prisma.exists.Comment({
            id: args.id,
            author: {
                id: userId
            }
        })

        if (!commentExists){
            throw new Error("Unable to update Comment")
        }

        return await prisma.mutation.updateComment({
            where: {
                id: args.id
            },
            data: args.data
        }, info)
        // const { id, data } = args
        //
        // const comment = db.comments.find((comment) => {
        //     return comment.id === id
        // })
        //
        // if (!comment) {
        //     throw new Error("Sorry that comment doesn't exist")
        // }
        //
        // if (typeof data.text === 'string') {
        //     comment.text = data.text
        // }
        //
        // pubSub.publish(`comment ${comment.post}`, {
        //     comment: {
        //         mutation: "UPDATED",
        //         data: comment
        //     }
        // })
        //
        // return comment
    }
}

export { Mutation as default }





// splice

// let users = [{
//     id: '1',
//     name: 'Kennedy',
//     email: 'kennedy@example.com',
//     age: 22
// },
//
//     {
//         id: '2',
//         name: 'richard',
//         email: 'richard@example.com',
//
//     },
//
//     {
//         id: '3',
//         name: 'john',
//         email: 'john@example.com',
//
//     }]
//
//
// const  deletedUsers = users.splice(1, 1)
// console.log(deletedUsers[0])