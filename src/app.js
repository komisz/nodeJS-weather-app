const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static dir to serve 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'MG'
  })  
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'MG'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'MG',
    message: 'do want you want to do or whatever'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send ({
      error: 'Please provide an address'
    })
  }

  geocode(req.query.address, (error, { lat, lng, location } = {}) => {
    if (error) {
      return res.send({ error })
    }
    
    forecast(lat, lng, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })  
  })
})

app.get('/x', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }

  console.log(req.query.search)
  res.send({
    x: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404',{
    title: '404',
    name: 'MG',
    message: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'MG',
    errorMessage: 'Page not found'
  })
})

app.listen(3000, () => {
  console.log('The server is up on port 3000.')
})