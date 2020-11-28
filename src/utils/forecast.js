const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=6cb1913d3dcb7ff47b7da91a04a1b0a6&query=${latitude},${longitude}&units=f`;
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service.');
        } else if (body.error) {
            callback('Unable to find location.');
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out. The wind speed is ${body.current.wind_speed} mph, ${body.current.wind_dir}. There are ${body.current.precip} inches of precipitation.`
            );
        }
    });
};

module.exports = forecast;