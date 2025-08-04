import express from 'express'
import { MulterError } from 'multer'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

import studentRoutes from './routes/students.routes.js'
import connectDB from './config/database.js'

// Global Variables
const PORT = process.env.PORT 
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Setup app
const app = express()

// Database Connection
connectDB()

// Middlewares
app.use(express.urlencoded({extended : false}))
app.use(express.json()) 
app.use(cors())
app.use('/uploads',express.static(path.join(__dirname,'uploads')))

app.use('/api/students', studentRoutes)

app.use((error, req, res, next)=>{
  if (error instanceof MulterError){
    return res.status(400).send(`Image Error : ${error.message} : ${error.code}`)
  }else if(error){
    return res.status(500).send(`Something Went wrong : ${error.message}`)
  }
  next()
})

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})