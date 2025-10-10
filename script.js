async function getWeather() {
    const city = document.getElementById("city").value.trim();
    
    // This will be replaced later with serverless function call
    document.getElementById("result").innerHTML = `<p>Fetching weather for ${city}...</p>`;
}
