import { log } from 'console';
import express from 'express';

const app = express();

const mymiddleware = (req, res, next)=>{
    const date = new Date()
    console.log("Hello from Middleware")
    console.log(`${date.getMonth()} ${req.method} ${req.url}`)
    next()
}

// Application Level Middlewares
app.use(mymiddleware)

app.get('/',mymiddleware, (req, res)=>{
    res.send("<h1>Home Page</h1>")
})

app.get('/about', (req, res)=>{
    res.send("<h1>About Page<h1/>")
})

app.listen(3000, ()=>{
    console.log('Server runing on port 3000')
})