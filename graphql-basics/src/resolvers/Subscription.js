// where we describe our subscription resolvers
const Subscription = {
    count: {
        subscribe (parent, args, { pubSub } = context, info)  {
            let count = 0

            setInterval(() => {
                count++

                pubSub.publish('count', {
                    count
                })
            }, 1000)

            return pubSub.asyncIterator('count')
        }
    },
    comment: {
        subscribe(parent, args, { db, pubSub } = context, info) {
            const {postId} = args
            const post = db.posts.find((post) => {
                return post.id === postId && post.published
            })

            if(!post) {
                throw new Error("Post not found")
            }

            // subscription name
            return pubSub.asyncIterator(`comment ${postId}`)
        }
    },
    post: {
        subscribe (parent, args, { pubSub } = context, info)  {
            return pubSub.asyncIterator("post")
        }
    }

}


export { Subscription as default }