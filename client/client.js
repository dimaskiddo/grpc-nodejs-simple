const express = require('express')
const helmet = require('helmet')

const httpPort = process.env.HTTP_SERVER_PORT || 5000

const app = express()


// -------------------------------------------------
// Express Module
app.use(helmet())

app.use(express.json())

app.use(express.urlencoded({ 
  extended: false,
  limit: '1mb'
}))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  next()
})


// -------------------------------------------------
// Load Router Handler to Express Module
app.use('/', require('./routes.js'))


// -------------------------------------------------
// Start Express Server
app.listen(httpPort, () => {
  console.log('GRPC Client HTTP Server Started at 0.0.0.0:'+httpPort);
});
