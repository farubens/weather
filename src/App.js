import axios from 'axios';
import { Fragment, useState, useEffect } from 'react'
import './App.css';

function App() {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  let getWeather  = async (lat, long) =>{
    let res = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
      params: {
          lat: lat,
          lon: long,
          appid: process.env.REACT_APP_OPEN_WEATHER_KEY,
          lang: 'pt',
          units: 'metric'
      }
    });
    setWeather(res.data);
    console.log(res.data);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  }, []);

  if (location == false) {
    return (
      <Fragment><h2>Você precisa permitir que o app veja sua localização</h2></Fragment>
    )
  }
  else if(weather == false){
      return(
        <Fragment>
          <p className="loading">Carregando o clima...</p>
        </Fragment>
      )
  }
  else {
    return (
      <Fragment>
        <section className="mainSec">
          <h1> Tempo em {weather.name} ({weather ["weather"] [0] ["description"]})</h1>
          <h2>
            Veja o clima
          </h2>
          <div className="pai">
            <div className="filho" id="temp">
              <h4>Temp. Atual</h4>
              <p>{weather.main.temp}º C</p>
            </div>
            <div className="filho" id="sensTern">
              <h4>Sensação térmica</h4>
              <p>{weather.main.feels_like}º C</p>
            </div>
            <div className="filho" id="tempMax">
              <h4>Temp. Máxima</h4>
              <p>{weather.main.temp_max}º C</p>
            </div>
            <div className="filho" id="tempMin">
              <h4>Temp. Mínima</h4>
              <p>{weather.main.temp_min}º C</p>
            </div>
            <div className="filho" id="vento">
              <h4>Vento</h4>
              <p>{weather.wind.speed} km/h</p>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default App;
