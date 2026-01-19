const apiKey = "65ad0fd25813140c86fc61d10dcb769d";

const weatherDiv = document.getElementById("weatherInfo");

function displayWeather(data) {
    weatherDiv.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
        <h3>${data.main.temp}°C</h3>
        <p>${data.weather[0].description}</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>💨 Wind: ${data.wind.speed} m/s</p>
    `;
    weatherDiv.classList.remove("hidden");
}

function getWeatherByCity() {
    const city = document.getElementById("cityInput").value.trim();

    if (city === "") {
        alert("Enter a city name");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
        .then(res => res.json())
        .then(data => {
            if (data.cod !== 200) {
                alert("City not found");
                return;
            }
            displayWeather(data);
        })
        .catch(() => alert("Network error"));
}

function getWeatherByLocation() {
    if (!navigator.geolocation) {
        alert("Geolocation not supported");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude } = position.coords;

            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`)
                .then(res => res.json())
                .then(data => displayWeather(data));
        },
        () => alert("Location permission denied")
    );
}
