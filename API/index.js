import express from 'express'
import connectDB from './Config/database.js'
import studentRoutes from './routes/students.routes.js'

const PORT = process.env.PORT || 3000

// create express app 
const app = express()
app.use('/api/students', studentRoutes)

// Database connection
connectDB()

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended : false}))

// parse application/json
app.use(express.json())

app.listen(PORT,()=>{
    console.log(`Started Serever at port http://localhost/${PORT}`)
})