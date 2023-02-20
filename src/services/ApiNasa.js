const db = require('../models')
const Data = db.data;

//Declaramos la función que llama a la api de la nasa

async function getApi() {
    try {
        console.log('EJECUTANDO GET API')

        const response = await fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=' + process.env.APIKEY)
        const roversList = await response.json()

        const roverPhoto = roversList.photos

        const newList = roverPhoto.map(rover => (
            {
                idNasa: rover.id,
                camera: rover.camera,
                img_src: rover.img_src,
                earth_date: rover.earth_date
            }));

        // Controlar documentos duplicados y sincronización
        const itemsToCreate = [];
        const existedItems = await Data.findAll();

        for (const item of newList) {
            const existed = existedItems.find((existedItem) => existedItem.idNasa === item.idNasa)
            if (!existed) {
                itemsToCreate.push(item)
            }
        }
        if (itemsToCreate.length > 0) {
            Data.bulkCreate(itemsToCreate);
            return 'DATOS SINCRONIZADOS Y GUARDADOS EN LA BASE DE DATOS';
        }

        return 'NO HAY DATOS NUEVOS PARA GUARDAR EN LA BASE DE DATOS';

    } catch (error) {
        console.log(error);
    }
}

//Exportamos la función para usarla en 'obtenerTodos' (nuestro GetAll) en controllerNasa.js
module.exports = getApi;