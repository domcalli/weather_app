const apiKey = `f42d610614b41950b60528e5dc091d9a`;

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=imperial`;
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherDescription = document.querySelector(".description");

async function checkWeather(city) {
  const response = await fetch(`${apiUrl}&q=${city}`);
  if (response.status === 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    const data = await response.json();
    const { description, icon: iconCode, main } = data.weather[0];

    weatherDescription.innerText = description;
    weatherDescription.toUppercase;
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = `${Math.round(
      data.main.temp
    )}&deg;F`;
    document.querySelector(
      ".humidity"
    ).innerHTML = `${data.main.humidity}&percnt;`;
    document.querySelector(".wind").innerHTML = `${Math.round(
      data.wind.speed
    )} mph`;

    //uses openweathermap.org icons
    // const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;

    // uses local icons
    const iconUrl = `./images/${main}.png`;
    weatherIcon.src = iconUrl;

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
