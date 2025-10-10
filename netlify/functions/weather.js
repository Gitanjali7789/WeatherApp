// netlify/functions/weather.js
const fetch = require("node-fetch");

exports.handler = async function(event, context) {
    const city = event.queryStringParameters?.city;

    if (!city) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "City not provided" }),
        };
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (!apiKey) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "API key not set" }),
        };
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Server error", error: err.message }),
        };
    }
};
