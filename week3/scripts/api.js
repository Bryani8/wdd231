const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const url = 'https://api.openweathermap.org/data/2.5/onecall/current?lat=15.76947&lon=-86.79603&units=metric&appid=f4f17694daa0dd8e74c2e9277cdd1fb8';

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

// function displayResults(data) {
//     currentTemp.innerHTML = `${data.}&deg;C`;
//     const iconsrc = `https://openweathermap.org/img/w/${}.`;
//     let desc = data.weather[0].;
//     weatherIcon.setAttribute('src', iconsrc);
//     weatherIcon.setAttribute('alt', 'Openweather Icon');
//     captionDesc.textContent = `${desc}`;

// }

apiFetch();