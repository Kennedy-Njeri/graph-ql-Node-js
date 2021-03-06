const User = {
    posts(parent, args, { db } = context, info) {
        return db.posts.filter((post) => {
            return post.author === parent.id
        })
    },
    comments(parent, args, { db } = context, info) {
        return db.comments.filter(comment => {
            return comment.author === parent.id
        })
    }
}



export { User as default }