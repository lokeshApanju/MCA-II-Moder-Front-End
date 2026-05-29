// ─────────────────────────────────────────────
//  CONFIG
//  Get a free API key from https://openweathermap.org/api
//  Replace "YOUR_API_KEY" with your actual key
// ─────────────────────────────────────────────
const API_KEY = "1b836764a725fd29417b8ef65b97ccee";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// ─────────────────────────────────────────────
//  STATE
// ─────────────────────────────────────────────
let currentTempC = 0;
let currentFeelsLikeC = 0;
let isCelsius = true;

// ─────────────────────────────────────────────
//  DOM ELEMENTS
// ─────────────────────────────────────────────
const cityInput      = document.getElementById("cityInput");
const searchBtn      = document.getElementById("searchBtn");
const errorBox       = document.getElementById("errorBox");
const errorText      = document.getElementById("errorText");
const loadingBox     = document.getElementById("loadingBox");
const weatherCard    = document.getElementById("weatherCard");
const celsiusBtn     = document.getElementById("celsiusBtn");
const fahrenheitBtn  = document.getElementById("fahrenheitBtn");
const quickBtns      = document.querySelectorAll(".quick-btn");

// Output elements
const cityNameEl   = document.getElementById("cityName");
const cityDateEl   = document.getElementById("cityDate");
const weatherIconEl= document.getElementById("weatherIcon");
const temperatureEl= document.getElementById("temperature");
const weatherDescEl= document.getElementById("weatherDesc");
const humidityEl   = document.getElementById("humidity");
const windSpeedEl  = document.getElementById("windSpeed");
const feelsLikeEl  = document.getElementById("feelsLike");
const visibilityEl = document.getElementById("visibility");
const pressureEl   = document.getElementById("pressure");
const cloudsEl     = document.getElementById("clouds");
const sunriseEl    = document.getElementById("sunrise");
const sunsetEl     = document.getElementById("sunset");

// ─────────────────────────────────────────────
//  WEATHER ICON MAP
// ─────────────────────────────────────────────
const getWeatherIcon = (id) => {
  if (id >= 200 && id < 300) return "⛈️";   // Thunderstorm
  if (id >= 300 && id < 400) return "🌦️";   // Drizzle
  if (id >= 500 && id < 600) return "🌧️";   // Rain
  if (id >= 600 && id < 700) return "❄️";   // Snow
  if (id >= 700 && id < 800) return "🌫️";   // Atmosphere
  if (id === 800)             return "☀️";   // Clear sky
  if (id === 801)             return "🌤️";   // Few clouds
  if (id === 802)             return "⛅";   // Scattered clouds
  if (id >= 803)              return "☁️";   // Broken / overcast
  return "🌡️";
};

// ─────────────────────────────────────────────
//  BACKGROUND GRADIENT BY WEATHER
// ─────────────────────────────────────────────
const setBackground = (id) => {
  const body = document.body;
  if (id === 800) {
    body.style.background =
      "linear-gradient(135deg, #1a1a2e 0%, #0f3460 50%, #1a4a7a 100%)";
  } else if (id >= 200 && id < 600) {
    body.style.background =
      "linear-gradient(135deg, #1a1a2e 0%, #2d2d44 50%, #1a2d44 100%)";
  } else if (id >= 600 && id < 700) {
    body.style.background =
      "linear-gradient(135deg, #1a1a2e 0%, #2a3a4a 50%, #3a4a5a 100%)";
  } else {
    body.style.background =
      "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)";
  }
};

// ─────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────
const toFahrenheit = (c) => Math.round((c * 9) / 5 + 32);

const formatTime = (unix, offset) => {
  const date = new Date((unix + offset) * 1000);
  let hours   = date.getUTCHours();
  const mins  = date.getUTCMinutes().toString().padStart(2, "0");
  const ampm  = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${mins} ${ampm}`;
};

const formatDate = () => {
  const days   = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const now    = new Date();
  return `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
};

// ─────────────────────────────────────────────
//  SHOW / HIDE UI STATES
// ─────────────────────────────────────────────
const showLoading = () => {
  loadingBox.classList.add("show");
  weatherCard.classList.remove("show");
  errorBox.classList.remove("show");
};

const showError = (msg) => {
  loadingBox.classList.remove("show");
  weatherCard.classList.remove("show");
  errorBox.classList.add("show");
  errorText.textContent = msg;
};

const showWeather = () => {
  loadingBox.classList.remove("show");
  errorBox.classList.remove("show");
  weatherCard.classList.add("show");
};

// ─────────────────────────────────────────────
//  UPDATE DISPLAYED TEMPERATURE
// ─────────────────────────────────────────────
const updateTemperatureDisplay = () => {
  if (isCelsius) {
    temperatureEl.textContent = `${Math.round(currentTempC)}°C`;
    feelsLikeEl.textContent   = `${Math.round(currentFeelsLikeC)}°C`;
  } else {
    temperatureEl.textContent = `${toFahrenheit(currentTempC)}°F`;
    feelsLikeEl.textContent   = `${toFahrenheit(currentFeelsLikeC)}°F`;
  }
};

// ─────────────────────────────────────────────
//  POPULATE WEATHER CARD
// ─────────────────────────────────────────────
const displayWeather = (data) => {
  const { name, sys, main, weather, wind, visibility, clouds, timezone } = data;

  // Save raw Celsius values
  currentTempC      = main.temp;
  currentFeelsLikeC = main.feels_like;

  // City & date
  cityNameEl.textContent = `${name}, ${sys.country}`;
  cityDateEl.textContent = formatDate();

  // Icon & temp
  weatherIconEl.textContent = getWeatherIcon(weather[0].id);
  updateTemperatureDisplay();

  // Description
  weatherDescEl.textContent = weather[0].description;

  // Details
  humidityEl.textContent  = `${main.humidity}%`;
  windSpeedEl.textContent = `${Math.round(wind.speed * 3.6)} km/h`;
  visibilityEl.textContent= `${(visibility / 1000).toFixed(1)} km`;
  pressureEl.textContent  = `${main.pressure} hPa`;
  cloudsEl.textContent    = `${clouds.all}%`;

  // Sunrise / Sunset
  sunriseEl.textContent = formatTime(sys.sunrise, timezone);
  sunsetEl.textContent  = formatTime(sys.sunset, timezone);

  // Background
  setBackground(weather[0].id);

  showWeather();
};

// ─────────────────────────────────────────────
//  FETCH WEATHER
// ─────────────────────────────────────────────
const fetchWeather = async (city) => {
  if (!city.trim()) {
    showError("Please enter a city name.");
    return;
  }

  showLoading();

  try {
    const url      = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);

    if (response.status === 404) {
      showError(`City "${city}" not found. Please check the spelling.`);
      return;
    }

    if (response.status === 401) {
      showError("Invalid API key. Please check your configuration.");
      return;
    }

    if (!response.ok) {
      showError("Something went wrong. Please try again later.");
      return;
    }

    const data = await response.json();
    displayWeather(data);

  } catch (err) {
    showError("Network error. Please check your connection.");
  }
};

// ─────────────────────────────────────────────
//  USE DEMO DATA (no API key needed)
// ─────────────────────────────────────────────
const DEMO_DATA = {
  Mumbai: {
    name: "Mumbai",
    sys: { country: "IN", sunrise: 1700017800, sunset: 1700059200 },
    main: { temp: 32, feels_like: 36, humidity: 78, pressure: 1008 },
    weather: [{ id: 801, description: "few clouds" }],
    wind: { speed: 4.2 },
    visibility: 6000,
    clouds: { all: 20 },
    timezone: 19800,
  },
  Delhi: {
    name: "Delhi",
    sys: { country: "IN", sunrise: 1700019600, sunset: 1700059800 },
    main: { temp: 22, feels_like: 20, humidity: 55, pressure: 1015 },
    weather: [{ id: 721, description: "haze" }],
    wind: { speed: 3.5 },
    visibility: 4000,
    clouds: { all: 40 },
    timezone: 19800,
  },
  Bangalore: {
    name: "Bangalore",
    sys: { country: "IN", sunrise: 1700018400, sunset: 1700059600 },
    main: { temp: 24, feels_like: 23, humidity: 62, pressure: 1013 },
    weather: [{ id: 802, description: "scattered clouds" }],
    wind: { speed: 3.0 },
    visibility: 8000,
    clouds: { all: 35 },
    timezone: 19800,
  },
  Chennai: {
    name: "Chennai",
    sys: { country: "IN", sunrise: 1700018000, sunset: 1700058800 },
    main: { temp: 34, feels_like: 38, humidity: 80, pressure: 1007 },
    weather: [{ id: 500, description: "light rain" }],
    wind: { speed: 5.5 },
    visibility: 5000,
    clouds: { all: 70 },
    timezone: 19800,
  },
  Kolkata: {
    name: "Kolkata",
    sys: { country: "IN", sunrise: 1700017200, sunset: 1700057600 },
    main: { temp: 28, feels_like: 30, humidity: 72, pressure: 1010 },
    weather: [{ id: 803, description: "broken clouds" }],
    wind: { speed: 4.0 },
    visibility: 7000,
    clouds: { all: 60 },
    timezone: 19800,
  },
  Hyderabad: {
    name: "Hyderabad",
    sys: { country: "IN", sunrise: 1700018200, sunset: 1700059000 },
    main: { temp: 27, feels_like: 26, humidity: 58, pressure: 1012 },
    weather: [{ id: 800, description: "clear sky" }],
    wind: { speed: 2.8 },
    visibility: 10000,
    clouds: { all: 5 },
    timezone: 19800,
  },
  Jaipur: {
    name: "Jaipur",
    sys: { country: "IN", sunrise: 1700019800, sunset: 1700060200 },
    main: { temp: 26, feels_like: 24, humidity: 40, pressure: 1014 },
    weather: [{ id: 800, description: "clear sky" }],
    wind: { speed: 3.2 },
    visibility: 10000,
    clouds: { all: 5 },
    timezone: 19800,
  },
  Pune: {
    name: "Pune",
    sys: { country: "IN", sunrise: 1700018000, sunset: 1700059400 },
    main: { temp: 25, feels_like: 24, humidity: 60, pressure: 1013 },
    weather: [{ id: 802, description: "scattered clouds" }],
    wind: { speed: 3.8 },
    visibility: 9000,
    clouds: { all: 30 },
    timezone: 19800,
  },
};

const fetchWeatherDemo = (city) => {
  showLoading();
  setTimeout(() => {
    const key  = Object.keys(DEMO_DATA).find(
      (k) => k.toLowerCase() === city.trim().toLowerCase()
    );
    if (key) {
      displayWeather(DEMO_DATA[key]);
    } else {
      showError(`City "${city}" not found in demo data. Try a Quick Search city.`);
    }
  }, 900);
};

// ─────────────────────────────────────────────
//  SWITCH: real API vs demo
//  Set USE_DEMO = false and add your API key
//  to use live weather data
// ─────────────────────────────────────────────
const USE_DEMO = false;

const getWeather = (city) => {
  if (USE_DEMO) {
    fetchWeatherDemo(city);
  } else {
    fetchWeather(city);
  }
};

// ─────────────────────────────────────────────
//  EVENT LISTENERS
// ─────────────────────────────────────────────

// Search button click
searchBtn.addEventListener("click", () => {
  getWeather(cityInput.value);
});

// Enter key in input
cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") getWeather(cityInput.value);
});

// Unit toggle buttons
celsiusBtn.addEventListener("click", () => {
  if (!isCelsius) {
    isCelsius = true;
    celsiusBtn.classList.add("active");
    fahrenheitBtn.classList.remove("active");
    updateTemperatureDisplay();
  }
});

fahrenheitBtn.addEventListener("click", () => {
  if (isCelsius) {
    isCelsius = false;
    fahrenheitBtn.classList.add("active");
    celsiusBtn.classList.remove("active");
    updateTemperatureDisplay();
  }
});

// Quick city buttons
quickBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const city = btn.getAttribute("data-city");
    cityInput.value = city;
    getWeather(city);
  });
});

// ─────────────────────────────────────────────
//  INIT — load a default city on startup
// ─────────────────────────────────────────────
getWeather("Raipur");