// Select DOM elements
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");

// API key (ensure it's valid)
const apiKey = "9321ee8562a1501fec452df4c4646a39";

// Add event listener for form submission
weatherForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const city = cityInput.value.trim();

    if (city) {
        try {
            console.log(`Fetching weather data for: ${city}`);
            const weatherData = await getWeatherData(city);
            console.log("Weather Data:", weatherData);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error("Error fetching data:", error);
            displayError("Failed to fetch weather data. Please try again.");
        }
    } else {
        displayError("Please enter a city name");
    }
});

// Fetch weather data from OpenWeatherMap API
async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    console.log("API URL:", apiUrl);
    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("City not found or API limit exceeded.");
    }

    return await response.json();
}

// Display weather information on the card
function displayWeatherInfo(data) {
    const { name, main, weather } = data;
    const temperature = Math.round(main.temp);
    const humidity = main.humidity;
    const description = weather[0].description;
    const weatherId = weather[0].id;

    card.innerHTML = `
        <h1 class="cityDisplay">${name}</h1>
        <div class="weatherEmoji">${getWeatherEmoji(weatherId)}</div>
        <p class="tempDisplay">${temperature}°C</p>
        <p class="descDisplay">${description}</p>
        <p class="humidityDisplay">Humidity: ${humidity}%</p>
    `;
    card.style.display = "flex";
}

// Determine emoji based on weather ID
function getWeatherEmoji(weatherId) {
    if (weatherId >= 200 && weatherId < 300) return "⛈️"; // Thunderstorm
    if (weatherId >= 300 && weatherId < 500) return "🌧️"; // Drizzle
    if (weatherId >= 500 && weatherId < 600) return "🌦️"; // Rain
    if (weatherId >= 600 && weatherId < 700) return "❄️"; // Snow
    if (weatherId >= 700 && weatherId < 800) return "🌫️"; // Atmosphere
    if (weatherId === 800) return "☀️"; // Clear
    if (weatherId > 800) return "☁️"; // Clouds
    return "🌈"; // Default
}

// Display error messages
function displayError(message) {
    card.innerHTML = `<p class="errorDisplay">${message}</p>`;
    card.style.display = "flex";
}
