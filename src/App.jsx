import { useState } from "react";
import Search from "./components/Search"
import Weather from "./components/Weather"
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api";

function App() {

  const [currentWeather, setCurrentWeather] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
      })
      .catch(console.log);
  }

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}/>
      {currentWeather ? <Weather data={currentWeather} /> : <div className="start">To start Search for a city</div>}
    </div>
  )
}

export default App
