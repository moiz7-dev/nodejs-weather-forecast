const request = require('postman-request');


forecast = (lat, long, callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=ff15d33dbb0a5415e02697ff0e17c616&query=' + lat + ',' + long + '&units=m'
    
    request({ url, json:true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to the service!', undefined)
        } else if (body.error) {
            callback('Invalid or missing parameters entered!', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.')
        }
    })
}

module.exports = {
    forecast
}