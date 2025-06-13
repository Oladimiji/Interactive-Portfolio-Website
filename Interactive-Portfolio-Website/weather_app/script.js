document.getElementById("search-btn").addEventListener("click", function () {
    const city = document.getElementById("city-input").value.trim();
    const apiKey = "6ee7d6acad83829a06bd5e900ca2289c"; // Replace with your OpenWeather API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    if (city === "") {
        alert("Please enter a city name!");
        return;
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById("city-name").textContent = data.name;
            document.getElementById("temperature").textContent = `${data.main.temp}°C`;
            document.getElementById("description").textContent = data.weather[0].description;

            // Correct Weather Icon URL
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            document.getElementById("weather-icon").src = iconUrl;
            document.getElementById("weather-icon").alt = data.weather[0].description; // Accessibility fix
        })
        .catch(() => alert("City not found!"));
});
