/* eslint-disable */
import './App.css';
import {useState, useEffect} from 'react';

function App() {
  const[Flag,setFlag] = useState(false)
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
    
  useEffect(() => {
    if(Flag) {
    let succes = (position) => {
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)

      if(Latitude && Longitude ){
        let GetLocation = `http://api.weatherapi.com/v1/current.json?key=62dceb908301426fbcc03441210307&q=${Latitude},${Longitude}`

        let FetchDataWeather = async () => {
          const Data = await fetch(GetLocation).then(respon => respon.json())
          
          setCountry(Data.location.country )
          setCity(Data.location.name +"/")
          setCloud(Data.current.cloud)
          setWind_mph(Data.current.wind_mph)
          setPressure_mb(Data.current.pressure_mb)
          setTemp_c(Data.current.temp_c)
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
  }
  },[Flag,Latitude,Longitude,Country,City,Cloud,Wind_mph,Pressure_mb,Temp_c,ConditionText])

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
          <h3>{Wind_mph}</h3>
          <h3>{Cloud}</h3>
          <h3>{Pressure_mb}</h3>
        </div>
        <button onClick={() => setFlag(true)}>
          My location Weather
        </button>
        <button onClick={() => console.log('cambio')}>
          DEGRESS°F/C
        </button>
      </div>
    </div>
  )
}

export default App;
