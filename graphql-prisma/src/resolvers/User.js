import getUserId from "../utils/getUserId";


const User = {

    posts: {
        fragment: 'fragment userId on User {id}',
        resolve(parent, args, {request, prisma}, info) {
            return prisma.query.posts({
                where: {
                    published,
                    author: {
                        id: parent.id
                    }
                }
            })
        }
    },
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