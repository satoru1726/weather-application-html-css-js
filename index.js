const apiKey = "get-your-own-api-from-OpenWeatherMap[just-login/create-a-free-account-then-generate-your-own-API-key]";

const inputCity = document.querySelector(".inputCity");
const cardDisply = document.querySelector(".card");

document.querySelector(".container").addEventListener("submit", async event => {
event.preventDefault();
const city = inputCity.value;
if (city) {
try {
const data = await getWeatherData(city);
displayWeatherInfo(data);
} catch (error) {
displayError("please enter a valid city name.[example: Miami/miami]");
}

}
else {
displayError("please enter something.");
}
})

async function getWeatherData(city) {
const url = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=${city.toString().toLowerCase()}&appid=${apiKey}`;
const response = await fetch(url);
if (!response.ok) {
throw new Error("enter a valid city name");
}
const jsonData = response.json();
return await jsonData;
}

function displayWeatherInfo(data) {
console.log(data);
const { name: city, main: { temp, humidity }, weather: [{ description }], wind: { speed } } = data;

cardDisply.textContent = "";
cardDisply.style.display = "flex";

const displayInfo = document.createElement("p");
const displayCity = document.createElement("h1");
const displayTemp = document.createElement("p");
const displayHumidity = document.createElement("p");
const displayWindSpeed = document.createElement("p");
const displayDesc = document.createElement("p");


displayInfo.textContent = "live weather report for: ";
cardDisply.appendChild(displayInfo);


displayCity.textContent = city;
displayCity.classList.add("city");
cardDisply.appendChild(displayCity);

displayTemp.textContent = "Temp: " + temp + "°C";
displayTemp.classList.add("temp");
cardDisply.appendChild(displayTemp);

displayHumidity.textContent = "Humidity: " + humidity + "%";
displayHumidity.classList.add("humidity");
cardDisply.appendChild(displayHumidity)

displayWindSpeed.textContent = "Wind Speed: " + speed + "kmph";
displayWindSpeed.classList.add("windSpeed");
cardDisply.appendChild(displayWindSpeed)

displayDesc.textContent = "Desc: " + description;
displayDesc.classList.add("desc");
cardDisply.appendChild(displayDesc)
}

function displayError(message) {
const errorDisplay = document.createElement("p");
errorDisplay.textContent = message;

errorDisplay.classList.add("error");

cardDisply.textContent = "";
cardDisply.style.display = "flex";
cardDisply.appendChild(errorDisplay);
}

