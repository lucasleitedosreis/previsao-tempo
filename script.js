let weather = {
  apiKey: "b4419c046bde93677ee945bc4e3273dd",
  localCidade: function (cidade) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        cidade +
        "&units=metric&appid=" +
        this.apiKey +
        "&lang=pt_br",
    )
      .then((response) => response.json())
      .then((clima) => this.displayWeather(clima));
  },
  displayWeather: function (clima) {
    const city = document.querySelector(".cidade");
    city.innerText = "Clima em " + clima.name;
    const temperatura = document.querySelector(".temperatura");
    temperatura.innerText = clima.main.temp.toFixed() + "°C";
    const descricao = document.querySelector(".descricao");
    descricao.innerText = clima.weather[0].description;
    const vento = document.querySelector(".vento");
    vento.innerText = "Vento: " + clima.wind.speed + " Km/h";
    const humidade = document.querySelector(".humidade");
    humidade.innerText = "Humidade: " + clima.main.humidity + " %";

    const weatherCss = document.querySelector(".container-temp-icon");
    weatherCss.classList.remove("loading");

    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1920x1080/?" + clima.name + "')";
  },

  search: function () {
    const cidade = document.getElementById("search").value;
    this.localCidade(cidade);
  },
};
const btn = document.getElementById("btn");
btn.addEventListener("click", function () {
  weather.search();
});
