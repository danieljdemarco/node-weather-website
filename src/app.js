const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Daniel'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Daniel'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpMessage: 'This app provides the weather forecast.',
        name: 'Daniel'
    })
})

app.get('/weather', ({ query } = {}, res) => {
    if (!query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }
    geocode(query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                location,
                forecast: forecastData,
                address: query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found.',
        name: 'Daniel'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found.',
        name: 'Daniel'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})