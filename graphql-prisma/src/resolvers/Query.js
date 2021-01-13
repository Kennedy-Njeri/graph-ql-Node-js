const Query = {
    users(parent, args, { db } = context, info) {
        if (!args.query) {
            return db.users
        }

        return db.users.filter((user) => {
            return user.name.toLowerCase().includes(args.query.toLowerCase())
        })
    },
    me() {
        return {
            id: '1234',
            name: 'Kennedy',
            email: 'Kennedy@ymail.com',
            age: 22,
        }
    },
    comments(parent, args, { db } = context, info) {
        return db.comments
    },
    post(parent, args, { db } = context, info) {
        if(!args.query){
            return db.posts
        }

        return db.posts.filter((post) => {
            const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
            const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())

            return isTitleMatch || isBodyMatch
        })
    }
}


export { Query as default }