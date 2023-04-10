const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/artistRoute.js', './routes/locationRoute.js', './routes/concertRoute.js']

swaggerAutogen(outputFile, endpointsFiles)