const Query = {
    users(parent, args, { db, prisma } = context, info) {

        const operationArgs = {}

        if (args.query){
            operationArgs.where = {
                OR: [{
                    name_contains: args.query
                }, {
                    email_contains: args.query
                }]
            }
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
    me() {
        return {
            id: '1234',
            name: 'Kennedy',
            email: 'Kennedy@ymail.com',
            age: 22,
        }
    },
    comments(parent, args, { db, prisma } = context, info) {
        return prisma.query.comments(null, info)
        //return db.comments
    },
    post(parent, args, { db, prisma } = context, info) {

        const operationArgs = {}

        if (args.query) {
            operationArgs.where = {
                OR: [{
                    title_contains: args.query
                }, {
                    body_contains: args.query
                }]
            }
        }



        return prisma.query.posts(operationArgs, info)
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