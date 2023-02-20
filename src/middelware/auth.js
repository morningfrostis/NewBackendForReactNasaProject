const jsonwebtoken = require('jsonwebtoken')
const db = require('../models')
const User = db.user;

const controlAuthentication = async (request, response, next) => {
    if (request.path.includes('/auth')) {
        return next()
    }

    if (!request.headers.authorization) {
        return response.status(403).json('STOP! You are not autheticaction')
    }

    const token = request.headers.authorization.split(" ")[1]

    if (!token) {
        return response.status(403).json('STOP! Wrong token')
    }

    const payload = jsonwebtoken.decode(token, process.env.TOKEN_SECRET)

    if (!payload || !payload.email) {
        return response.status(403).json('SORRY! Wrong token')
    }

    const user = await User.findOne({ where: { email: payload.email } } )

    if (!user) {
        return response.status(403).json('UPPSS! Wrong token')
    }

    request.user = { id: user.id, email: user.email }

    next()
}

module.exports = {
    controlAuthentication
}