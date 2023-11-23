require('dotenv').config()
const express = require('express')
const cors = require('cors')
const questionRoutes = require('./routes/questionRoutes')

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api', questionRoutes)

const port = process.env.PORT || 5000

try {
  app.listen(port, () => {
    console.log(`Backend app listening at http://localhost:${port}`)
  })
} catch(err) {
  console.error(err)
}