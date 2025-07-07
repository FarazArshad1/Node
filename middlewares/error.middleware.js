import express from 'express'

const app = express()

app.get('/',(req,res)=>{
    res.send("<h1>This is Home Page<h1/>")
})

app.get('/about', (req, res)=>{
    res.sen("<h1>This is about page<h1/>")
})

app.use((error, req, res, next)=>{
    console.error(error.stack)
    res.status(500).send("Something Broke!")
    next()
})

app.use((req, res)=>{
    res.send("<h1>Error 404, Page not Found<h1/>")
})

app.listen(3000, ()=>{
    console.log('Server running on port 3000')
})