const request = require('postman-request');

const geocode = (location, callback) => {
    let url = ''
    if (location['address']) {
        url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location.address)}.json?access_token=pk.eyJ1IjoiZGFuaWVsamRlbWFyY28iLCJhIjoiY2toeTd2YWV2MDNlczJ4bDZpeGR0Z3UycSJ9.6jshFGQf5r0H6KUWuQDoRQ&limit=1`;
    } else if (location['coords']) {
        const coords = {
            latitude: location.coords.split(',')[0],
            longitude: location.coords.split(',')[1]
        }
        url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords.longitude},${coords.latitude}.json?access_token=pk.eyJ1IjoiZGFuaWVsamRlbWFyY28iLCJhIjoiY2toeTd2YWV2MDNlczJ4bDZpeGR0Z3UycSJ9.6jshFGQf5r0H6KUWuQDoRQ&limit=1`
    } else {
        callback('No valid location given.')
    }
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to location service.');
        } else if (body.features.length === 0) {
            callback('No results returned from location service.');
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
};

module.exports = geocode;