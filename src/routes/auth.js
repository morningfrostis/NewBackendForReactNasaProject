const { signup, login } = require('../controllers/auth');
const routerAuth = require('express').Router()

routerAuth.post('/signup', async (request, response) => {
    try {
        const { email, password } = request.body
        if (!email || !password) {
            return response.status(502).json(error.message)
        }

        const token = await signup({ email, password })
        return response.status(200).json(token)

    } catch (error) {
        return response.status(500).json(error.message)
    }
})

routerAuth.post('/login', async (request, response) => {
    try {
        const { email, password } = request.body
        if (!email || !password) {
            return response.status(502).json('Incorrect data')
        }

        const token = await login({ email, password })
        return response.status(200).json(token)

    } catch (error) {
        response.status(500).json(error.message)
    }
})

module.exports = routerAuth;