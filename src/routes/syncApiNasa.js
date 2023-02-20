const routerNasa = require('express').Router();
const getApi = require('../services/ApiNasa');
const { getNasaById, createNasa, updateNasa, removeNasa } = require('../controllers/controlerNasa')

routerNasa.get('/', async (request, response) => {
    try {
        const result = await getApi()
        response.status(200).json(result)
    } catch (error) {
        response.status(500).json(error);
    }
});

module.exports = routerNasa;