/* eslint-disable */
import './App.css';
import {useState, useEffect} from 'react';
let render = 0;

function App() {
  const[Flag2,setFlag2] = useState(false)
  const[Flag3,setFlag3] = useState(false)
  const[Latitude, setLatitude] = useState('')
  const[Longitude, setLongitude] = useState('')
  const[Country, setCountry] = useState('')
  const[City, setCity] = useState('')
  const[Cloud, setCloud] = useState('')
  const[Wind_mph, setWind_mph] = useState('')
  const[Pressure_mb, setPressure_mb] = useState('')
  const[Temp_c, setTemp_c] = useState('')
  const[ConditionText, setConditionText] = useState('')
  const[ConditionIcon, setConditionIcon] = useState('')
  
  render++
  console.log(render)
    
  useEffect(() => {

    let succes = (position) => {
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)

      if(Latitude && Longitude ){
        let GetLocation = `https://api.weatherapi.com/v1/current.json?key=62dceb908301426fbcc03441210307&q=${Latitude},${Longitude}`

        let FetchDataWeather = async () => {
          const Data = await fetch(GetLocation).then(respon => respon.json())
          if(Flag2){
            setTemp_c(Data.current.temp_f + ' °F')
            setFlag3(true)

          } else {
            setTemp_c(Data.current.temp_c + ' °C')
            setFlag3(false)
            
          }
          setCountry(Data.location.country )
          setCity(Data.location.name +"/")
          setCloud(Data.current.cloud)
          setWind_mph(Data.current.wind_mph)
          setPressure_mb(Data.current.pressure_mb)
          setConditionText(Data.current.condition.text)
          setConditionIcon(Data.current.condition.icon)
        }
        FetchDataWeather()
      }
    }

    let error = ( ) => {
    console.log('Unable to retrieve your location')
    }

    if(!navigator.geolocation){
      console.log('Geolocation is not supported by your browser')
    } else {
      navigator.geolocation.getCurrentPosition(succes, error)
    }
  },[Flag2,Latitude,Longitude])

  return (
    <div className="App">
      <h1>Weather App</h1>
      <h2>{City}{Country}</h2>
      <div className="Country_City">
        <div className="Temperature">
          <img src={ConditionIcon}></img>
          <h3>{Temp_c}</h3>
        </div>
        <div className="Conditions">
          <h3>{ConditionText}</h3>
          <h3><span>Wind speed: </span>{Wind_mph}<span> m/s</span></h3>
          <h3><span>Clouds: </span>{Cloud}<span> %</span></h3>
          <h3><span>Pressure: </span>{Pressure_mb}<span> mb</span></h3>
        </div>
      </div>
      <div className="Buttons">
        <button className="Degress" onClick={() =>{
          if(!Flag3){
            setFlag2(true)
          } else {
            setFlag2(false)
          }
        }}>DEGRESS °F/°C
        </button>
      </div>
    </div>
  )
}

export default App;


