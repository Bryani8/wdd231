const apiKey = 'f4f17694daa0dd8e74c2e9277cdd1fb8';
const lat = -0.1807;
const lon = -78.4678;

const WeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

async function apiFetch() {
    try {
        const weatherResponse = await fetch(WeatherUrl);
        if (weatherResponse.ok) {
            const weatherData = await weatherResponse.json();
            displayCurrentWeather(weatherData);
        } else {
            throw Error(await weatherResponse.text());
        }

        const forecastResponse = await fetch(forecastUrl);
        if (forecastResponse.ok) {
            const forecastData = await forecastResponse.json();
            displayForecast(forecastData);
        } else {
            throw Error(await forecastResponse.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayCurrentWeather(data) {
    const tempCurrent = document.querySelector('#current-temp');
    const weatherDesc = document.querySelector('#weather-desc');
    tempCurrent.innerHTML = `${data.main.temp}&deg;C`;
    weatherDesc.textContent = data.weather[0].description
}

function displayForecast(data) {
    const forecast = data.list.filter(item => item.dt_txt.includes('09:00:00')).slice(0, 3);
    const forecastContainer = document.querySelector('#forecast-container');
    forecastContainer.innerHTML = '';

    forecast.forEach(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', {weekday: 'short'});

        const dayCard = document.createElement('div');
        dayCard.classList.add('forecast-card');
        dayCard.innerHTML = `
            <p><strong>${dayName}</strong></p>
            <p>${day.main.temp}&deg;C</p>
            <p>${day.weather[0].description}</p>
        `;
        forecastContainer.appendChild(dayCard);
    })
}

apiFetch();