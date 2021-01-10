const request = require('request')
require('./forcast.js')

const getLocation = (addr, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(addr) + '.json?access_token=pk.eyJ1IjoiZXlhbGdyZWVuIiwiYSI6ImNramg2a2pzdjQyamUyd252ZWR3c2M2Y3kifQ.uxjq58GS14gZ5tgSl4tX2A'
    request({ url: url, json: true }, (error, response) => {
        // console.log(response.body);
        if (error) {
            callback('Unable to connect to weather service!', undefined)

        } else if (response.body.features.length === 0) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                lat: response.body.features[0].center[1],
                lon: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = getLocation;