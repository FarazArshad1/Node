import express from express

const app = express()
const router = express.Router()

const myroutermiddleware = ((req, res, next)=>{
    const date = new Date()
    console.log("Router Level Middleware")
    console.log()
    next()
})

// Router Level Middleware
router.use(myroutermiddleware)

router.get('/',(req, res) => {
    res.send("<h1>Home Router<h1/>")
})

router.use('/about', (req, res)=>{
    res.send("<h1>About Router<h1/>")
})

app.listen(3000, ()=>{
    console.log('Server runing on port 3000')
})
