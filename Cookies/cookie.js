import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()

// Middlewares
app.use(cookieParser("832e7dh237hd328us9q1283032493483783dh47dh48274294847238434h4r6trh56787432737ry47658746t465"))

app.get('/',(req, res)=>{
    res.send('Home Page')
})

app.get('/set-cookie',(req, res)=>{
    res.cookie('username','Faraz Arshad',{
        maxAge : 900000,
        httpOnly : true,
        signed : true, // Cookie with password is signed cookie
    })

    res.send('Cookie has been set')
})

app.get('/get-cookie',(req, res)=>{
    // const username = req.cookies.username
    const username = req.signedCookies.username

    if(!username){
        res.send('No Cookie Found')
    }else{
        res.send(`Username ${username}`)
    }
})

app.get('/remove-cookie',(req, res)=>{
    res.clearCookie('username')
    res.send(`Cookie has been deleted`)
})

app.listen(3000, ()=>{
    console.log('Server running on port 3000')
})