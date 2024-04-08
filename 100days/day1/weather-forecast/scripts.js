const weatherForecast = document.querySelector(".weather-forecast");
const weatherBox = document.querySelector(".weather-image");
const desciptions = document.querySelector(".descriptions");
const error404 = document.querySelector(".not-found");
const search = document.querySelector(".weather-forecast .search");
const searchinput = document.querySelector(
  ".weather-forecast .search-box input"
);
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "en-US";
recognition.continous = false;
const synth = window.speechSynthesis;
const speak = (text) => {
  const utter = new SpeechSynthesisUtterance(text);
  synth.speak(utter);
};
const handletext = (text) => {
  const handletext = text.toLowerCase();
  if (handletext.includes("weather in")) {
    let location = handletext.split("weather in")[1].trim();
    console.log(handletext);
    if (location.endsWith(".")) {
      // Nếu có, loại bỏ dấu chấm cuối cùng
      location = location.slice(0, -1);
    }
    console.log(handletext.split("in"));
    console.log(location);
    searchinput.value = location;
    const change = new Event("click");
    search.dispatchEvent(change);
  }
};
search.addEventListener("click", (e) => {
  e.preventDefault();
  recognition.start();
  searchinput.setAttribute("placeholder", "is listening");
});
recognition.onresult = (e) => {
  console.log(e);
  const result = e.results[0][0].transcript;
  console.log(result);
  handletext(result);
};
recognition.onend = () => {
  searchinput.setAttribute("placeholder", "Enter the Location...");
};
recognition.onerror = (e) => {
  console.error("error", e);
  searchinput.value = "JAPAN";
  const click = new Event("click");
  search.dispatchEvent(click);
  speak("We will set value default to japan.Please try again");
};

//https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={API key}
const APIKey = "e4ded2a50671be2e37d96352ffc0dc39";
search.addEventListener("click", () => {
  const city = searchinput.value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
  fetch(url)
    .then((data) => data.json())
    .then((value) => {
      console.log(value);
      if (value.cod == 404 || value.cod == 401 || value.cod == 400) {
        weatherForecast.style.height = "400px";
        error404.style.display = "block";
        // weatherBox.style.display = "none";
        // desciptions.style.display = "none";
        error404.classList.add("fade-in");
      } else {
        error404.style.display = "none";
        error404.classList.add("fade-in");
        const image = document.querySelector(".weather-image img");
        const humidity = document.querySelector(".descriptions .humidity span");
        const windspeed = document.querySelector(
          ".descriptions .wind-speed span"
        );
        const temperature = document.querySelector(".temperature");
        const description = document.querySelector(".description");
        switch (value.weather[0].main) {
          case "Clear":
            image.src = "../img/clear.png";
            break;

          case "Rain":
            image.src = "../img/rain.png";
            break;

          case "Snow":
            image.src = "../img/snow.png";
            break;

          case "Clouds":
            image.src = "../img/cloud.png";
            break;

          case "Haze":
            image.src = "../img/mist.png";
            break;

          default:
            image.src = "";
        }

        temperature.innerHTML = `${parseInt(value.main.temp)} <span>°C</span>`;
        description.innerHTML = `${value.weather[0].description}`;
        humidity.innerHTML = `${value.main.humidity}%`;
        windspeed.innerHTML = `${value.wind.speed}Km/h`;
        weatherForecast.style.height = "590px";
        desciptions.classList.add("fade-in");
        weatherBox.classList.add("fade-in");
        // setTimeout(() => {
        //   weatherBox.classList.remove("fade-in");
        //   desciptions.classList.remove("fade-in");
        //   weatherForecast.style.height = "105px";
        // }, 3000);
      }
    });
});
