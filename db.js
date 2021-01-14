var mongoose = require('mongoose')
const MONGODB_URI= 'mongodb://mongodb:27017/whiteboard'
  const MONGODB_OPTIONS= {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  }

var db = mongoose.createConnection(MONGODB_URI, MONGODB_OPTIONS)

var isConnected = false

db.on('connected', () => {
  console.log('Mongoose connected')
  isConnected = true
})

db.on('disconnected', () => {
  console.log('Mongoose disconnected')
  isConnected = false
})

db.on('error', (err) => {
  console.log('Mongoose connection closed' + err)
  isConnected = false
})

process.on('SIGINT', () => {
  db.close(() => {
    console.log('Mongoose connection closed')
    process.exit(0)
  })
  setTimeout((data) => process.exit(0), 3000)
})

function onConnect() {
  return new Promise((resolve) => {
    if (isConnected) {
      return resolve()
    }

    db.on('connected', () => {
      return resolve()
    })
  })
}

module.exports = { db, onConnect }
