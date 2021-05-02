const request = require('postman-request')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibW9pejc3IiwiYSI6ImNrbzB1am1xbTAzdG0yeG92endobmFmNTYifQ.MSRuAZfIxSkA4U3hECkVaA&limit=1'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to the service!', undefined)
        } else if (!body.features[0]) {
            callback('Invalid or missing parameters entered!', undefined)
        } else {
            callback(undefined, {
                location: body.features[0].place_name,
                lat: body.features[0].center[1],
                long: body.features[0].center[0]})
        }
    })

}

module.exports = {
    geocode
};
