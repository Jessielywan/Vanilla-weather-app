function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours <10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes <10) {
        minutes = `0${minutes}`;
    }
    let days = [
        "Sunday", 
        "Monday", 
        "Tuesday", 
        "Wednesday", 
        "Thursday", 
        "Friday", 
        "Saturday"
    ];
    let day = days[date.getDay()];

    return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    

    return days[day];
}

function displayForecast(response) {
    let forecast = response.data.daily;

    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`
    forecast.forEach(function (forecastDay, index) {
        if (index < 6) {


    forecastHTML = forecastHTML + 
    `
        <div class="col-2">
            <div class="weather-forecast-date">
                ${formatDay(forecastDay.time)}
            </div>
            <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png" 
            alt="" 
            width="90" />
            <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temperature.maximum)}°
                </span>
                <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temperature.minimum)}°
                </span>
            </div>
        </div>
    `;
        }
    });

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey = "o3d77t41a2a0ce9d42f448b54f6283dd";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.lon}&lat=${coordinates.lat}&key=${apiKey}&units=metric`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
    let currentTemperature = document.querySelector(".temperature");
    let currentCity = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");


    celsiusTemperature = response.data.main.temp;

    currentTemperature.innerHTML =  Math.round (celsiusTemperature);
    currentCity.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round (response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);

    getForecast(response.data.coord);
}

function search(city) {
    let apiKey = "7e67235e40d58e70d3e9c3f3890d96b9";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityElement = document.querySelector(".search-input");
    search(cityElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Amsterdam");