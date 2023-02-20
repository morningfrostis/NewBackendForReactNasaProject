const routerUser = require('express').Router()
const db = require('../models')
const User = db.user;
const { request } = require('express')
const { getUserById, toggleNasaToFavorite } = require('../controllers/controlerUser')

// Agregar favoritos a un usuario y controlar si existe dicho favorito en la DB
routerUser.post('/addToFavorites/:roverId', async (request, response) => {
    try {
        const { roverId } = request.params
        const { user, isAdded } = await toggleNasaToFavorite({
            userId: request.user.id,
            roverId
        })
        if (isAdded) {
            response.status(200).json('Favorites successfully added')
        } else {
            response.status(200).json('Favorite delete Ok')
        }
    } catch (error) {
        if (error.message === 'No exist this data in DB routes') {
            response.status(400).json(error.message)
        } else {
            console.log(error)
            response.status(500).json('No exist this data in DB routes 2')
        }
    }
})

routerUser.get('/favoritesByUser/:userId', async (request, response) => {
    try {
        const { userId } = request.params
        const user = await User.findOne({
            where: { id: userId },
            attributes: {
                exclude: ['password', 'salt', 'createdAt', 'updatedAt']
            },
            include: [{
                model: db.data,
                through: 'UserData',
                as: 'favorites',
            }]
        })

        response.status(200).json(user)

    } catch (error) {
        response.status(500).json(error.message)
    }
})

// ¡¡OJO!!! --> Obtener favoritos por cada usuario ***** FALTA TERMINARLA *****
// routerUser.get('/favorites/:userId', async (request, response) => {
//     try {
//         const { userId } = request.params
//         const user = await getUserById({
//             roverId: request.user.id,
//             userId
//         })
//         const favorites_ = user.nasaFavs
//         response.status(200).json(favorites_)
//     } catch (error) {
//         response.status(500).json('Cant show favorites')
//     }
// })

module.exports = routerUser