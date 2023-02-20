const express = require('express');
const bodyParser = require('body-parser');
const routerUser = require('./src/routes/users');
const routerNasa = require('./src/routes/syncApiNasa');
const routerRovers = require('./src/routes/rovers');
const routerAuth = require('./src/routes/auth');
const { controlAuthentication } = require('./src/middelware/auth')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()

const startApp = async () => {
    const app = express();
    app.use(cors());
    const port = process.env.PORT

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }))

    app.use(controlAuthentication)
    app.use('/users', routerUser)
    app.use('/rovers', routerRovers)
    app.use('/syncApi', routerNasa)
    app.use('/auth', routerAuth)
    try {
        app.listen(port, () => {
            console.log('NASA APP running on port ' + port)
        })
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

startApp()