require('dotenv').config()
const express = require('express')
// import sequelize connection

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(require('./routes'))

// sync sequelize models to the database, then turn on the server
require('./config/connection.js')
  .sync()
  .then(() => app.listen(process.env.PORT || 3000))
  .catch(err => console.log(err))

