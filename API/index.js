import express from 'express'
import mongoose from 'mongoose'

// create express app 
const app = express()

// mongodb connection
mongoose.Connect('mongodb://localhost:27017/students-crud')
.then(()=>console.log('Connected to Monogodb'))
.catch(err => console.log(err))

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended : false}))

// parse application/json
app.use(express.json())


app.post('/',(req, res)=>{
    const data = req.body
    res.send(`Hello ${data.name}`)
})

app.listen(3000,()=>{
    console.log(``)
})