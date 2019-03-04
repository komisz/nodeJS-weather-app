const request = require('request');

const forecast = (lat, lng, callback) => {
  const url = `https://api.darksky.net/forecast/acc823c31a387b1c7e0290fba6f75748/${lat},${lng}?lang=hu&units=si`

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('unable to connect to weather service', undefined)
    } else if (body.length > 0) {
      callback('unable to find location', undefined)
    } else {
      callback(undefined, `${body.daily.data[0].summary} There is a ${body.currently.temperature} Celsius temperature and ${body.currently.precipProbability}% chance of rain.` )
    }
  })
}

module.exports = forecast