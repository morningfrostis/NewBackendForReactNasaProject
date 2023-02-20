const db = require('../models');
const Data = db.data;

const getNasaList = async () => {
    const result = await Data.findAll();
    return result
}

const getNasaById = async (id) => {
    const result = await Data.findByPk(id);
    return result
}

const createNasa = async ({ idNasa, camera, img_src, earth_date }) => {
    const result = await Data.create({ idNasa, camera, img_src, earth_date })
    return result
}

const updateNasa = async (id, data) => {
    const result = await Data.update(data, {
        where: {
            id: id
        }
    }, { new: true });
    if (!result) {
        throw new Error("No se encuentra el documento a actualizar")
    }
    return result
}

const removeNasa = async (id) => {
    await Data.destroy({
        where: {
            id
        }
    })
    return true
}
 
module.exports = {
    getNasaList,
    getNasaById,
    createNasa,
    updateNasa,
    removeNasa
}