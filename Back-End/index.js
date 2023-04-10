const express = require('express')
const mongoose = require('mongoose')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
const artistRoute = require('./routes/artistRoute.js')
const locationRoute = require('./routes/locationRoute.js')
const concertRoute = require('./routes/concertRoute.js')
const mongoString = "mongodb+srv://cranberries:MareParola@cluster0.eytfjtp.mongodb.net/test"

const cors = require('cors');

mongoose.connect(mongoString);
const database = mongoose.connection


database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();
const port = 4000;

/*
app.use(express.json());
app.use('/artist', artistRoute)
app.use('/location', locationRoute)
app.use('/concert', concertRoute)
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))


require('./routes/concertRoute.js')(app);
require('./routes/locationRoute.js')(app);
require('./routes/artistRoute.js')(app);

app.listen(port, () => { console.log(`Hello world app listening on port ${port}!`);});
*/

const concertRoot = '/concert'
const artistRoot = '/artist'
const locationRoot = '/location'


app.use(express.json());
app.use(cors());
app.use(`${concertRoot}`, concertRoute);
app.use(`${artistRoot}`, artistRoute);
app.use(`${locationRoot}`, locationRoute);

app.listen(port, () => { console.log(`Hello world app listening on port ${port}!`);});
