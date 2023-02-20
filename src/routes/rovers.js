const routerRovers = require('express').Router();
const { getNasaList, getNasaById, createNasa, updateNasa, removeNasa } = require('../controllers/controlerNasa')

routerRovers.get('/', async (request, response) => {
    try {
        const result = await getNasaList()
        response.status(200).json(result)
    } catch (error) {
        response.status(500).json(error);
    }
});

routerRovers.get('/:id', async (request, response) => {
    try {
        const { id } = request.params
        const result = await getNasaById(id)
        response.status(200).json(result)
    } catch (error) {
        response.status(500).json(error)
    }
});

routerRovers.post('/', async (request, response) => {
    try {
        const result = await createNasa(request.body);
        response.status(201).json(result);
    } catch (error) {
        console.log(error)
        response.status(500).json({ message: "Create server error" });
    }
});

routerRovers.put('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await updateNasa(id, request.body);
        response.status(200).json(result);
    } catch (error) {
        response.status(500).json({ message: "Update server error" });
    }
});

routerRovers.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await removeNasa(id);
        response.status(200).json({ message: "Resource deleted" });
    } catch (error) {
        response.status(500).json({ message: "Delete server error" });
    }
});

module.exports = routerRovers;