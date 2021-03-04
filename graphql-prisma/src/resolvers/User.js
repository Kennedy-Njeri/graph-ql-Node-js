import getUserId from "../utils/getUserId";


const User = {


    email: {
        fragment: 'fragment userId on User {id}',
        resolve(parent, args, { request } = context, info) {
            const userId = getUserId(request)

            if (userId && userId === parent.id) {
                return parent.email()
            }  else {
                return null
            }
        }
    }




    // posts(parent, args, { db } = context, info) {
    //     return db.posts.filter((post) => {
    //         return post.author === parent.id
    //     })
    // },
    // comments(parent, args, { db } = context, info) {
    //     return db.comments.filter(comment => {
    //         return comment.author === parent.id
    //     })
    // }
}



export { User as default }