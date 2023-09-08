// Current time
let currentTime = new Date();
let h2 = document.querySelector("#currentTime");
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currentYear = date.getFullYear();
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentHour = date.getHours();
  let currentMinute = date.getMinutes();
  let currentDate = date.getDate();
  let amOrPm = currentHour >= 12 ? "PM" : "AM";
  currentHour = currentHour % 12 || 12;

  let formattedDate = `${currentDay} ${currentDate} ${currentMonth} ${currentYear} <br> ${currentHour}:${currentMinute} ${amOrPm}`;
  return formattedDate;
}
let formattedTime = formatDate(currentTime);
h2.innerHTML = formattedTime;

// Weather Search Engine
function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-text-input");
  document.querySelector("#city").innerHTML = cityInput.value;
  searchCity(cityInput.value);
}

let cityForm = document.querySelector("#search-form");
cityForm.addEventListener("submit", changeCity);

function changeTemp(response) {
  document.querySelector("#city").innerHTML = response.data.name;

  let temp = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = temp + "°C";
}

function searchCity(city) {
  let apiKey = "2ba13a40eac12ad1d77f84ed3e44e587";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(changeTemp);
}

// Current Location Button
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

function getCurrentLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(retrieveCurrentLocation);
  } else {
    // Handle the case where geolocation is not available
    console.error("Geolocation is not available in this browser.");
  }
}

function retrieveCurrentLocation(position) {
  let apiKey = "2ba13a40eac12ad1d77f84ed3e44e587";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  let cityName = response.data.name;
  let temperature = Math.round(response.data.main.temp);

  document.querySelector("#city").innerHTML = cityName;
  document.querySelector("#temperature").innerHTML = temperature + "°C";
}
