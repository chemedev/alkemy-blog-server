//? set env variables
const dotEnv = require('dotenv')
dotEnv.config()

//? imports
const cors = require('cors')
const db = require('./database')
const express = require('express')

//? express
const app = express()
const PORT = process.env.PORT || 3001

//? middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/uploads', express.static('uploads'))
app.use((err, _req, res, next) => {
  if (!err) return next()
  return res
    .status(err.status)
    .json({ error: 'Malformed JSON', message: err.message })
})

//? routes
app.get('/', (_req, res) => res.send('Test'))
app.use('/posts', require('./routes/Post'))
app.use('/categories', require('./routes/Category'))

async function server() {
  try {
    await db.authenticate()
    console.log('DB Connected')
    await app.listen(PORT)
    console.log(`API running on http://localhost:${PORT}`)
  } catch (error) {
    console.log(error)
  }
}

server()
