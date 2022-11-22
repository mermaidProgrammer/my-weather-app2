//Challenge - Get today's date
function formatDate(cDate) {
  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let index = cDate.getDay();
  let day = week[index];

  let calYear = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = cDate.getMonth();
  let monthShort = calYear[month];

  let date = cDate.getDate();
  let year = cDate.getFullYear();

  return `${day}, ${monthShort} ${date}, ${year}`;
}

//Report out current Date
let todaysDate = document.querySelector("#current-date");
todaysDate.innerHTML = formatDate(new Date());

//Report out current Time
function formatTime(cDate) {
  let hour = cDate.getHours();
  let min = cDate.getMinutes();
  let minString = min;
  if (minString < 10) {
    minString = `0${minString}`;
  } else {
  }

  return `Last Updated: ${hour}:${minString}`;
}
let todaysTime = document.querySelector("#current-time");
todaysTime.innerHTML = formatTime(new Date());

//Challenge 2- Use a form to update the city name,
function updateCity(event) {
  event.preventDefault();
  let newCityInput = document.querySelector("#city-input");
  let city = newCityInput.value;
  let newCity = document.querySelector("h1");
  newCity.innerHTML = `Weather for: ${city}`;

  //Challenge 4 - Update current Temperature for given city
  let apiKey = "4c9b53e4f8f5eb00df5915bdca340605";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  function showTemperature(response) {
    console.log(response.data);
    //update temperture
    let temperatureElement = document.querySelector("#num-temp");
    let roundTemp = Math.round(response.data.main.temp);
    temperatureElement.innerHTML = `${roundTemp}`;
    //update condition
    let condElement = document.querySelector("#c-cond");
    condElement.innerHTML = `${response.data.weather[0].main}`;
    //update the current weather icon
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  }
  //  Call - update the current temperature
  axios.get(apiURL).then(showTemperature);
}
//   Call - Use a form to update the city name
let searchNewCityForm = document.querySelector("#city-form");
searchNewCityForm.addEventListener("submit", updateCity);

//Challenge 5 - Use Current Location Button
function updateLoc() {
  function cPosition(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;

    let apiKey = "4c9b53e4f8f5eb00df5915bdca340605";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${apiKey}`;

    function showTemperature(response) {
      console.log(response.data);
      //Update temperature
      let temperatureElement = document.querySelector("#num-temp");
      temperatureElement.innerHTML = `${response.data.main.temp}`;

      //update condition
      let condElement = document.querySelector("#c-cond");
      condElement.innerHTML = `${response.data.weather[0].main}`;

      //update the city name
      let newCity = document.querySelector("h1");
      newCity.innerHTML = `Weather for: ${response.data.name}`;

      //update the current weather icon
      let iconElement = document.querySelector("#icon");
      iconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      );
    }
    axios.get(apiURL).then(showTemperature);
  }
  navigator.geolocation.getCurrentPosition(cPosition);
}
//   Call the function
let cLocButton = document.querySelector(".currentLocButton");
cLocButton.addEventListener("click", updateLoc);

//Challenge 3 - Switch between Farenheit and Celcius
function changeC(event) {
  event.preventDefault();
  let temp = document.querySelector("#num-temp");
  temp.innerHTML = `12.7`;
}
let cTemp = document.querySelector("#c-link");
cTemp.addEventListener("click", changeC);

function changeF(event) {
  event.preventDefault();
  let temp = document.querySelector("#num-temp");
  temp.innerHTML = `55`;
}
let fTemp = document.querySelector("#f-link");
fTemp.addEventListener("click", changeF);
