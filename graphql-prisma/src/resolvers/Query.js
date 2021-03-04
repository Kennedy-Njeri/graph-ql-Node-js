import getUserId from "../utils/getUserId";

const Query = {
    users(parent, args, { db, prisma } = context, info) {

        const operationArgs = {
            where: {
                published: true
            }
        }

        if (args.query){

            operationArgs.where.OR = [{
                name_contains: args.query
            }, {
                email_contains: args.query
            }]

        }
        return prisma.query.users(operationArgs, info)
        // if (!args.query) {
        //     return db.users
        // }
        //
        // return db.users.filter((user) => {
        //     return user.name.toLowerCase().includes(args.query.toLowerCase())
        // })
    },
    async me(parent, args, { db, prisma, request } = context, info) {

        const userId = getUserId(request)

        return prisma.query.user({
            where: {
                id: userId
            }
        })

    },
    comments(parent, args, { db, prisma } = context, info) {
        return prisma.query.comments(null, info)
        //return db.comments
    },

    async myPosts(parent, args, { db, prisma, request } = context, info) {

        const userId = getUserId(request)

        const operationArgs = {
            where: {
                author: {
                    id: userId
                }
            }

        }
        
        if (args.query) {
            operationArgs.where.OR = [{
                title_contains: args.query
            }, {
                body_contains: args.query
            }]
        }

        return prisma.query.posts(operationArgs, info)

    },
    async post(parent, args, { db, prisma, request } = context, info) {

        const userId = getUserId(request, false)

        const posts = await prisma.query.posts({
            where: {
                id: args.id,
                OR: [{
                    published: true
                }, {
                    author: {
                        id: userId
                    }
                }]
            }
        }, info)

        if (posts.length === 0) {
            throw new Error("Post not found")
        }

        return posts[0]


        // const operationArgs = {}
        //
        // if (args.query) {
        //     operationArgs.where = {
        //         OR: [{
        //             title_contains: args.query
        //         }, {
        //             body_contains: args.query
        //         }]
        //     }
        // }
        //
        //
        //
        // return prisma.query.posts(operationArgs, info)
        // if(!args.query){
        //     return db.posts
        // }
        //
        // return db.posts.filter((post) => {
        //     const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
        //     const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
        //
        //     return isTitleMatch || isBodyMatch
        // })
    }
}


export { Query as default }