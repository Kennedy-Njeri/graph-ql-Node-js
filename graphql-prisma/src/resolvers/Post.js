const Post = {
    // in parent we can access parent.id, title, author
    // author(parent, args, { db } = context, info) {
    //     return db.users.find((user) => {
    //         return user.id === parent.author
    //     })
    // },
    // comments(parent, args, { db } = context, info) {
    //     return db.comments.filter((comment) => {
    //         return comment.post === parent.id
    //     })
    // }
}



export { Post as default }