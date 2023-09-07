import React, { useState } from 'react'

function WeatherApp() {

  const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
  const  api_key='fd092b57c08d4ffd76464596e8d2db81'
  const difKelvin = 273.15

  const [city, setCity] = useState(" ")
  const [dataWeather, setDataWeather] = useState(null)

  const handleCityChange = (e) =>{
    setCity(e.target.value)
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    if(city.length > 0) fetchWeather()
  }

  const fetchWeather = async () =>{
    
    try{
      const response = await fetch(`${urlBase}?q=${city}&appid=${api_key}`)
      const data = await response.json()
      setDataWeather(data)
    }
    catch(error){
      console.error('The nexr error has ocurred')
    }
  } 

  

  return (
    <div className='container'>
        <h1>WeatherApp</h1>

        <form onSubmit={handleSubmit}>
          <input 
          type="text"
          value={city}
          onChange={handleCityChange}
          />

          <button type="submit">Search</button>
        </form>
        {
          dataWeather && (
            <div>
              <h2>{dataWeather.name}</h2>
              <p>Temperature: {parseInt(dataWeather?.main?.temp - difKelvin)}ºC</p>
              <p>Description: {dataWeather.weather[0].description} </p>
              <img src={`https://openweathermap.org/img/wn/${dataWeather.weather[0].icon}@2x.png`} alt="" />
            </div>
          )
        }
    </div>
  )
}

export default WeatherApp