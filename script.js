var form = document.forms.cityForm;
form.search.onclick = sendRequest;
form.cityName.addEventListener("keydown", function (event) {
  if (event.keyCode == 13) {
    sendRequest();
    event.preventDefault();
  }
});

function sendRequest() {
  var requestURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    form.cityName.value +
    "&appid=2a0e8878624a82dfebfc2f97d67290de";
  var request = new XMLHttpRequest();
  request.open("GET", requestURL);
  request.responseType = "json";
  request.send();

  request.onload = function () {
    var cityweather = request.response;
    displayResult(cityweather);
  };
}

function displayResult(weatherInfo) {
  var container = document.createElement("div");
  container.setAttribute("name", weatherInfo.name);

  var NameCity = document.createElement("h2");
  NameCity.textContent = form.cityName.value;
  container.appendChild(NameCity);

  var lon_p = document.createElement("p");
  var lat_p = document.createElement("p");
  lon_p.textContent = "Довгота: " + weatherInfo.coord.lon;
  lat_p.textContent = " Широта: " + weatherInfo.coord.lat;

  container.appendChild(lon_p);
  container.appendChild(lat_p);

  var header3 = document.createElement("h3");
  header3.textContent = "Дата: " + new Date().toDateString(new Date());
  container.appendChild(header3);

  var p1 = document.createElement("p");
  var p2 = document.createElement("p");
  var p3 = document.createElement("p");

  var temperatureReal = Math.round(weatherInfo.main.temp - 273.16);
  var temteratureFeels = Math.round(weatherInfo.main.feels_like - 273.16);
  p1.textContent = "Температура повітря: " + temperatureReal + " °C";
  p2.textContent = "Відчувається як: " + temteratureFeels + " °C";
  p3.textContent = "Швидкість вітру: " + weatherInfo.wind.speed + " м/с";

  var p4 = document.createElement("p");
  p4.textContent = "Вологість: " + weatherInfo.main.humidity + "%";
  container.appendChild(p1);
  container.appendChild(p2);
  container.appendChild(p3);
  container.appendChild(p4);

  var block = document.createElement("div");
  block.classList.add("blockdiv");
  container.appendChild(block);
  document.body.appendChild(container);
}
