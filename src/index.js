const express = require('express')
const path = require('path')
const app = express()

require('dotenv').config()

const port = process.env.PORT || 3000
const LogInCollection = require('./mongo')

const templatePath = path.join(__dirname, '../templates')
const publicPath = path.join(__dirname, '../public')

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(publicPath))

app.set('view engine', 'hbs')
app.set('views', templatePath)

app.get('/', (req, res) => {
    res.render('login')
})

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.post('/login', async (req, res) => {
    try {
        const check = await LogInCollection.findOne({name: req.body.name})

        if(check.password === req.body.password) {
            res.status(201).render('home', {
                naming: `${req.body.password}+${req.body.name}`
            })
        } else {
            res.send("Incorrect password!!")
        }
    } catch (e) {
        res.send("Wrong credentials entered...")
    }
})

app.post('/signup', async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password
    }

    const checking = await LogInCollection.findOne({ name: req.body.name})

    try {
        if(checking.name === req.body.name && checking.password === req.body.password){
            res.send("User details already exists!")
        } else {
            await LogInCollection.insertMany([data])
        }
    } catch (e) {
        res.send("Wrong inputs...")
    }
    res.status(201).render("home", {
        naming: req.body.name
    })
})

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})

