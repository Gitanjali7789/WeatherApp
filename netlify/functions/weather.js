// netlify/functions/weather.js

exports.handler = async function(event, context) {
    const city = event.queryStringParameters.city;
    const apiKey = process.env.OPENWEATHER_API_KEY; 

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (err) {
        
        // --- ADD THIS LINE ---
        console.error("Fetch failed:", err); // This will print the error to your terminal

        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Server Error" }),
        };
    }
};