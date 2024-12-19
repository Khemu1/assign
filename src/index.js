const form = document.querySelector("form");
const weatherDiv = document.getElementById("weather");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  /** @type {HTMLInputElement} */
  const countryName = form.countryName.value;

  // i do recommend handling country names before calling
  fetchWeather(countryName);
});

/**
 * fetches weather data for a given country
 * @param {string} countryName 
 * @returns {Promise<void>}
 */
const fetchWeather = async (countryName) => {
  const apiKey = ""; // your private API key
  const days = 3;
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${countryName}&days=${days}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      weatherDiv.innerHTML = "Error fetching weather data";
      throw new Error(`Error: ${response.status}`);
    }

    /** @type {import("./types/types.js.js").WeatherForecast} */
    const data = await response.json();

    console.log(`3-day weather forecast for ${data.location.name}:`);
    data.forecast.forecastday.forEach((day, index) => {
      console.log(`Day ${index + 1} --> Weather: ${day.day.condition.text}`);
    });
    displayWeather({ forecastDays: data.forecast.forecastday });
  } catch (error) {
    console.error("Error fetching weather data:", error);
    weatherDiv.innerHTML = "Failed to fetch weather data.";
  }
};

/**
 * displays weather conditions in the console
 * @param {{forecastDays: import("./types/types.js.js").ForecastDay[]}} forecastDays
 */
const displayWeather = ({ forecastDays }) => {
  weatherDiv.innerHTML = forecastDays
    .map(
      (day, index) =>
        `<p>Day ${index + 1}: ${day.day.condition.text}, Temp: ${
          day.day.avgtemp_c
        }°C</p>`
    )
    .join("");
};
