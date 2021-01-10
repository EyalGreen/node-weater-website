const request = require('request')
const getWeather = (lat, lon, callback) => {
    var newUrl = 'http://api.weatherstack.com/current?access_key=af9206132f34d71e51a459ed63393841&query=' + lat + ',' + lon
    request({ url: newUrl, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            var feelLike = response.body.current.feelslike
            var currently = response.body.current.temperature
            var msg = response.body.current.weather_descriptions[0] + " It is currently " + currently + " degress out. It feels like " + feelLike + " degress out."
            callback(undefined, msg)
        }
    })
}
module.exports = getWeather