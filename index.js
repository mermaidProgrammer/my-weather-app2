//set-up a global variable
let farenheitTemp = null;

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

  //Get current Time
  let hour = cDate.getHours();
  let min = cDate.getMinutes();
  let minString = min;
  if (minString < 10) {
    minString = `0${minString}`;
  } else {
  }
  return `Updated: ${hour}:${minString}, ${day}, ${monthShort} ${date}, ${year}`;
}

//Challenge 4 - Update current Temperature for given city
function showTemperature(response) {
  console.log(response.data);
  //update city name
  let newCity = document.querySelector("h1");
  newCity.innerHTML = `Weather for: ${response.data.name}`;
  //update temperture
  let temperatureElement = document.querySelector("#num-temp");
  let roundTemp = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = `${roundTemp}`;
  farenheitTemp = roundTemp;
  //update condition
  let condElement = document.querySelector("#c-cond");
  condElement.innerHTML = `${response.data.weather[0].main}`;
  //update windspeed
  let windSpeedElement = document.querySelector("#w-speed");
  windSpeedElement.innerHTML = `${Math.round(response.data.wind.speed)}`;
  //update the current weather icon
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  //update the alternate text in the current weather icon
  iconElement.setAttribute("alt", `${response.data.weather[0].main}`);
}

//Challenge 2- Use a form to update the city name
function search(city) {
  let apiKey = "4c9b53e4f8f5eb00df5915bdca340605";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  //  Call - update the current temperature
  axios.get(apiURL).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let newCityInput = document.querySelector("#city-input");
  let city = newCityInput.value;
  search(city);
}

//Report out current Date
let todaysDate = document.querySelector("#current-date");
todaysDate.innerHTML = formatDate(new Date());

//Call upon loading page
search("Chicago");

//Call - Use a form to update the city name
let searchNewCityForm = document.querySelector("#city-form");
searchNewCityForm.addEventListener("submit", handleSubmit);

//Challenge 3 - Switch between Farenheit and Celcius
function changeC(event) {
  event.preventDefault();
  let temp = document.querySelector("#num-temp");
  temp.innerHTML = Math.round((farenheitTemp - 32) * (5 / 9));

  //remove active class for farenheit, add active class for celcius
  fTempLink.classList.remove("active");
  cTempLink.classList.add("active");
}
function changeF(event) {
  event.preventDefault();
  let temp = document.querySelector("#num-temp");
  temp.innerHTML = farenheitTemp;

  //remove active class for celcius, add active class for farenheit
  cTempLink.classList.remove("active"); //this should change the text color from black to blue
  fTempLink.classList.add("active");
}

let cTempLink = document.querySelector("#c-link");
cTempLink.addEventListener("click", changeC);

let fTempLink = document.querySelector("#f-link");
fTempLink.addEventListener("click", changeF);
