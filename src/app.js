function displayTemperature(response) {
    console.log(response.data);
    let currentTemperature = document.querySelector(".temperature");
    let currentCity = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    currentTemperature.innerHTML =  Math.round (response.data.main.temp);
    currentCity.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round (response.data.wind.speed);
}

let apiKey = "7e67235e40d58e70d3e9c3f3890d96b9";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Amsterdam&appid=${apiKey}&units=metric`;


axios.get(apiUrl).then(displayTemperature);