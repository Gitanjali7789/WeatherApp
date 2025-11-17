// Get references to all the NEW elements
const cardElement = document.getElementById("weather-card");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const cityName = document.getElementById("city-name");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const messageDisplay = document.getElementById("message-display");

async function getWeather() {
    const city = document.getElementById("city").value.trim();
    if (!city) {
        messageDisplay.innerHTML = `<p>Please enter a city</p>`;
        return;
    }

    const url = `/.netlify/functions/weather?city=${city}`;

    // Clear old data and show a "loading" state
    messageDisplay.innerHTML = `<p>Loading...</p>`;
    weatherIcon.src = '';
    temperature.textContent = '';
    cityName.textContent = '';
    humidity.textContent = '';
    windSpeed.textContent = '';

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            // --- ⬇️ This is the new way ⬇️ ---
            // Instead of one big innerHTML, we fill each part
            messageDisplay.innerHTML = ""; // Clear "Loading..."
            temperature.textContent = `${Math.round(data.main.temp)}°C`;
            cityName.textContent = `${data.name}, ${data.sys.country}`;
            humidity.textContent = `${data.main.humidity}%`;
            windSpeed.textContent = `${data.wind.speed} m/s`;
            
            // --- ⬇️ This logic is updated ⬇️ ---
            const condition = data.weather[0].main;

            // The base class is 'weather-card'. We add a new one.
            switch (condition) {
                case "Clear":
                    weatherIcon.src = 'images/sun.png';
                    cardElement.className = 'weather-card weather-clear';
                    break;
                case "Clouds":
                    weatherIcon.src = 'images/cloud.png';
                    cardElement.className = 'weather-card weather-clouds';
                    break;
                case "Rain":
                case "Drizzle":
                    weatherIcon.src = 'images/rain.png';
                    cardElement.className = 'weather-card weather-rain';
                    break;
                case "Thunderstorm":
                    weatherIcon.src = 'images/storm.png';
                    cardElement.className = 'weather-card weather-storm';
                    break;
                case "Snow":
                    weatherIcon.src = 'images/snow.png';
                    cardElement.className = 'weather-card weather-snow';
                    break;
                default:
                    weatherIcon.src = 'images/cloud.png';
                    cardElement.className = 'weather-card weather-clouds';
            }
            // --- ⬆️ End of new logic ⬆️ ---

        } else {
            messageDisplay.innerHTML = `<p>${data.message} 😞</p>`;
            cardElement.className = 'weather-card'; // Reset to default on error
        }
    } catch (err) {
        messageDisplay.innerHTML = `<p>Network error 😞</p>`;
        cardElement.className = 'weather-card'; // Reset to default on error
    }
}