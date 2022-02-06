// //Data e horario
// const horas = document.querySelector(".horas");
// const data = document.querySelectorAll(".data");
// const dateNow = new Date();
// data.innerText =

//weather forecast
const api = {
  apiKey: "b4419c046bde93677ee945bc4e3273dd",
  units: "metric",
  lingua: "pt_br",
};
const inputSearch = document.getElementById("search");
const btnSearch = document.querySelector(".btn");
const btnLocation = document.querySelector(".btn-location");
const city = document.querySelector(".cidade");
const country = document.querySelector(".country");
const temperatura = document.querySelector(".temperatura");
const iconImage = document.querySelector(".icon-clima");
const descricao = document.querySelector(".descricao");
const vento = document.querySelector(".vento");
const humidade = document.querySelector(".humidade");

//usando a geolocalizção
function buscarLocalizacao() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
    //alerta de erro caso a geolocalização não funcione
  } else {
    alert("Desculpe a geolocalização não é suportada pelo navegador");
  }
  //pega os valores da localização
  function setPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    fetchCoordResults(latitude, longitude);
  }
  function showError(error) {
    alert(`erro: ${error.message}`);
  }
  inputSearch.value = "";
}
btnLocation.addEventListener("click", buscarLocalizacao);
window.addEventListener("load", buscarLocalizacao);

//fetch usando a geolocalização
function fetchCoordResults(latitude, longitude) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${api.units}&appid=${api.apiKey}&lang=${api.lingua}`,
  )
    .then((response) => response.json())
    .catch((error) => {
      alert(error.message);
    })
    .then((clima) => displayWeather(clima));
}

//usando a barra de pesquisa
//trantamento do click e pegas os dados do input com click
function handleClick(event) {
  event.preventDefault();
  fetchWeather(inputSearch.value);
}
btnSearch.addEventListener("click", handleClick);

//tratamento do enter, pegas os dados do input pressionando enter
function enter(event) {
  const key = event.keyCode;
  if (key === 13) {
    fetchWeather(inputSearch.value);
  }
}
inputSearch.addEventListener("keypress", enter);

function fetchWeather(cidade) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=${api.units}&appid=${api.apiKey}&lang=${api.lingua}`,
  )
    .then((response) => response.json())
    .then((clima) => displayWeather(clima));
}
function displayWeather(clima) {
  city.innerText = clima.name + " " + clima.sys.country;
  temperatura.innerText = clima.main.temp.toFixed() + "°C";
  descricao.innerText = clima.weather[0].description;
  vento.innerText = "Vento: " + clima.wind.speed + " Km/h";
  humidade.innerText = "Humidade: " + clima.main.humidity + " %";
  const weatherCss = document.querySelector(".container-weather");
  weatherCss.classList.remove("loading");
  document.body.style.backgroundImage =
    "url('https://source.unsplash.com/1600x900/?" + clima.name + "')";
}
