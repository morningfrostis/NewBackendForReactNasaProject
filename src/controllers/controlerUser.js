const db = require('../models')
const User = db.user;
const Data = db.data

const getUserById = async (id) => {
    const user = await User.findByPk(id)
    delete user.password;
    return user
}

const getUserByEmail = async (email) => {
    const user = await User.findOne({
        where:
            { email: email }
    })
    return user
}

const toggleNasaToFavorite = async ({ userId, roverId }) => {
    let user = await User.findByPk(userId, {
        attributes: { exclude: ['password', 'salt'] },
        include: {
            model: db.data,
            as: 'favorites'
        }
    });
    console.log('PREV', user)
    let currentFavList = user.favorites.map(item => item.id) || [];

    const existed = currentFavList.includes(roverId);

    let isAdded = false;
    if (!existed) {
        const rover = await Data.findByPk(roverId);
        if (!rover) {
            throw new Error('Rover not found');
        }
        user.addFavorites(rover)
        isAdded = true;
    } else {
        const newList = currentFavList.filter(item => item !== roverId)
        user.setFavorites(newList)
    }

    return { user, isAdded };
}

module.exports = {
    getUserById,
    getUserByEmail,
    toggleNasaToFavorite
}