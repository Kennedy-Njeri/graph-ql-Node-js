import jwt from 'jsonwebtoken'

const getUserId = (request, requireAuth = true) => {
    const header = request.request.headers.authorization

    if (header) { const token = header.replace('Bearer ', '') // or header.split(" ")[1]
        const decoded = jwt.verify(token, 'itscool')

        return decoded.userId

    }

    if (requireAuth) {
        throw  new Error("Authentication required")
    }

    return null

}


export { getUserId as default }