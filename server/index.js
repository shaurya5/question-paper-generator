require('dotenv').config()
const express = require('express')
const cors = require('cors')
const questionRoutes = require('./routes/questionRoutes')

const app = express()
app.use(express.json())
app.use(cors())

const port = process.env.PORT || 5000

app.use('/api', questionRoutes)

app.listen(port, () => {
  console.log(`Backend app listening at http://localhost:${port}`)
})