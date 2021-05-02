const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../Templates/views')
const partialsPath = path.join(__dirname, '../Templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDir))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Moiz'
    })
})

app.get('/weather' , (req, res) => {
    
    const address = req.query.address
    
    if (!address){
        return res.send({
            error: 'Please enter address!'
        })
    }

    
    geocode.geocode(address, (error, {location, lat, long} = {}) => {
        if(error){
            return res.send({
                error
            })
        }

        forecast.forecast(lat, long, (error, forecast) => {
            if(error){
                res.send({
                    error
                })
            }

            res.send({
                forecast,
                location,
                address: req.query.address
            })
        })
    })

})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Moiz'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Moiz'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: 'Moiz',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: 'Moiz',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Node server started!')
})