const hbs = require('hbs')
const path = require('path')
const express = require('express')
const forcast = require('./utils/forcast.js')
const geocode = require('./utils/geocode.js');

const app = express()
const port = process.env.PORT || 3000;



//Define paths for Express config
const viewsPath = path.join(__dirname, '../templates/views')
const publicDirectoryPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.use(express.static(publicDirectoryPath))
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.set('view engine', 'hbs')


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Eyal Green'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { lat, lon, location } = {}) => {
            if (error) {
                return res.send({
                    error
                })
            }
            forcast(lat, lon, (error, data) => {
                if (error) {
                    return res.send({
                        error
                    })
                }
                res.send({
                    forcast: data,
                    location,
                    address: req.query.address
                })

            })
        })
        // res.send({
        //     address: req.query.address,
        //     location: 'Israel',
        //     forcast: 'It is snowing'
        // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Eyal Green'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Eyal Green',
        msg: 'If you need help'
    })
})



app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Eyal Green',
        errormsg: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Eyal Green',
        errormsg: 'Page not found'
    })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port);
})