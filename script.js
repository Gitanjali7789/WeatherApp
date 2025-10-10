async function getWeather() {
    const city = document.getElementById("city").value.trim();
    if (!city) return alert("Please enter a city");

    const url = `/.netlify/functions/weather?city=${city}`; // call serverless function

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            document.getElementById("result").innerHTML = `
                <h3>${data.name}, ${data.sys.country}</h3>
                <p>🌡 Temperature: ${data.main.temp} °C</p>
                <p>💧 Humidity: ${data.main.humidity}%</p>
                <p>🌬 Wind Speed: ${data.wind.speed} m/s</p>
                <p>☁ Condition: ${data.weather[0].description}</p>
            `;
        } else {
            document.getElementById("result").innerHTML = `<p>${data.message} 😞</p>`;
        }
    } catch (err) {
        document.getElementById("result").innerHTML = `<p>Network error 😞</p>`;
    }
}
