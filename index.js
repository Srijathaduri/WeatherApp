const API_KEY = `89e2841e3ae80233114182eefa9e30b1`;
//const API = `https://api.openweathermap.org/data/2.5/weather?
//q=${city}&appid=${API_KEY}&units=metric`
//const IMG_URL = `https: //openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
const form = document.querySelector("form");
const weather = document.querySelector("#weather");
const search = document.querySelector("#search");

const getWeather = async (city) => {
    weather.innerHTML = `<h2> Loading... <h2>`
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    return showWeather(data)
}

const showWeather = (data) => {
    if (data.cod == "404") {
        weather.innerHTML = `<h2> City Not Found <h2>`
        return;
    }
    
    // Move these inside the function where data is available
    const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
    
    weather.innerHTML = `
     <div>
       <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
     </div>
    <div>
        <h2>${data.main.temp}℃</h2>
        <h4>${data.weather[0].main}</h4>
    </div>
    <div>
        <p>🌅 Sunrise: ${sunriseTime}</p>
        <p>🌇 Sunset: ${sunsetTime}</p>
    </div>`
}

form.addEventListener(
    "submit",
    function(event) {
        getWeather(search.value)
        event.preventDefault();
    }
)