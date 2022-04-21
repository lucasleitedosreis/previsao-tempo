// Enmu listando os grupos associados com a imagem
let WEATHER_MAIN_CODES_IMAGES = {
  Thunderstorm: 'tempestade.png',
  Drizzle: 'chuva.png',
  Rain: 'chuva.png',
  Snow: 'neve.png',
  Clear: 'sol.png',
  Clouds: 'nublado.png',
  Mist: 'mist.png',
  Haze: 'haze.png',
  Dust: 'dust.png',
  Smoke: 'smoke.png',
  Fog: 'fog.png',
  Sand: 'sand.png',
  Ash: 'ash.png',
  Squall: 'squall.png',
  Tornado: 'tornado.png',
};

//weather forecast
const api = {
  apiKey: 'b4419c046bde93677ee945bc4e3273dd',
  units: 'metric',
  lingua: 'pt_br',
};
const inputSearch = document.getElementById('search');
const error = document.querySelector('.error');
const erroLocalizacao = document.querySelector('.error-localizacao');
const btnSearch = document.querySelector('.btn');
const btnLocation = document.querySelector('.btn-location');
const city = document.querySelector('.cidade');
const country = document.querySelector('.country');
const temperatura = document.querySelector('.temperatura');
const iconImage = document.querySelector('.icon-clima');
const descricao = document.querySelector('.descricao');
const vento = document.querySelector('.vento');
const humidade = document.querySelector('.humidade');
const data = document.querySelector('.data');

//usando a geolocalizção
//-----------------------------------------------------------------------------------
function buscarLocalizacao() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(positionSuccess, showError);
    //alerta de erro caso a geolocalização não funcione
  } else {
    alert('Desculpe a geolocalização não é suportada pelo navegador');
  }
  //pega os valores da localização
  function positionSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    fetchCoordResults(latitude, longitude);
  }
  function showError(error) {
    erroLocalizacao.innerText = error.message;
    erro.classList.add('ativo');
  }
  inputSearch.value = '';
}
btnLocation.addEventListener('click', buscarLocalizacao);
window.addEventListener('load', buscarLocalizacao);

//fetch usando a geolocalização
function fetchCoordResults(latitude, longitude) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${api.units}&appid=${api.apiKey}&lang=${api.lingua}`)
    .then((response) => response.json())
    .then((clima) => displayWeather(clima));
}

//-----------------------------------------------------------------------------------
//usando a barra de pesquisa
//trantamento do click e pegas os dados do input com click
function handleClick(event) {
  event.preventDefault();
  const cityName = inputSearch.value.toLowerCase();
  erroLocalizacao.classList.remove('ativo');
  fetchWeather(cityName);
}
btnSearch.addEventListener('click', handleClick);
//-----------------------------------------------------------------------------------
//tratamento do enter, pega os dados do input pressionando enter
function enter(event) {
  const key = event.keyCode;
  if (key === 13) {
    const cityName = inputSearch.value.toLowerCase();
    fetchWeather(cityName);
  }
}
inputSearch.addEventListener('keypress', enter);

//-----------------------------------------------------------------------------------
//fetch usando a cidade
function fetchWeather(cidade) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=${api.units}&appid=${api.apiKey}&lang=${api.lingua}`)
    .then((response) => response.json())
    .then((clima) => displayWeather(clima));
}

function displayWeather(clima) {
  if (clima.cod === '404') {
    error.classList.add('ativo');
    error.innerText = `${inputSearch.value}, cidade não encontrada.`;
    return;
  }

  error.classList.remove('ativo');
  city.innerText = clima.name + ' ' + clima.sys.country;
  temperatura.innerText = clima.main.temp.toFixed();
  descricao.innerText = clima.weather[0].description;
  vento.innerText = 'Vento: ' + clima.wind.speed + ' Km/h';
  humidade.innerText = 'Humidade: ' + clima.main.humidity + ' %';

  //-----------------------------------------------------------------------------------
  //altera o icone do clima de acordo com idClima recebido da api
  const { main: weatherMain } = clima.weather[0];
  const weaterImage = WEATHER_MAIN_CODES_IMAGES[weatherMain];
  iconImage.src = `./assets/img/${weaterImage}`;

  //-----------------------------------------------------------------------------------
  //caso não tenha local recolhe o container, deixando somente a barra de pesquisa.
  const ocultaContainer = document.querySelector('.container-weather');
  ocultaContainer.classList.remove('loading');
  //-----------------------------------------------------------------------------------
  //altera o background de acordo com a cidade
  // document.body.style.backgroundImage =
  //   "url('https://source.unsplash.com/1600x900/?" + clima.name + "')";
  //-----------------------------------------------------------------------------------
  //adicona data
  let dateNow = new Date();
  data.innerText = dateBuilder(dateNow);

  //Data e horario
  function dateBuilder(d) {
    let days = ['Domingo', 'segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    let months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} de ${month} ${year}`;
  }
}
