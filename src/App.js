import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import './App.css';

function App() {

  function formatDateVerbose(date) {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    let day = date.getDate();
    let month = months[date.getMonth()];
    let year = date.getFullYear();
  
    return `${day} ${month} ${year}`;
  }

  function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  
  let date = new Date();
  let formattedTime = formatAMPM(date);
  let formattedDate = formatDateVerbose(date);

  let datestr = "";
  datestr += formattedDate;
  datestr += " ";
  datestr += formattedTime;
  
  console.log(datestr);

  const apiKey = "910be1902f0c05b921f2148f738f13f1";
  const [inputCity, setInputCity] = useState("");
  const [data, setData] = useState({});

  const getWetherDetails = (cityName) => {
    if (!cityName) return;
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    axios.get(apiURL).then((res) => {
      console.log("response", res.data);
      setData(res.data);
    }).catch((err) => {
      console.log("err", err);
    });
  }

  const handleChangeInput = (e) => {
    console.log("value", e.target.value);
    setInputCity(e.target.value);
  }

  const handleSearch = () => {
    getWetherDetails(inputCity);
  }

  return (
    <div className="col-md-12 wetherBg">
      <h1 className="heading">Weather App</h1>

      <div className="d-grid gap-3 col-4 mt-4">
        <input 
          type="text" 
          className="form-control"
          value={inputCity}
          onChange={handleChangeInput} 
        />
        <button 
          className="btn btn-primary" 
          type="button"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {Object.keys(data).length > 0 && (
        <div className="col-md-12 text-center mt-5">
          <div className="shadow rounded wetherResultBox">
            <img 
              className="weathorIcon"
              src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png" 
              alt="Weather Icon"
            />
            <h5 className="weathorCity whitefont">{data?.name}</h5>
            <h6 className="weathorTemp whitefont">{((data?.main?.temp) - 273.15).toFixed(2)}°C</h6>
            <p className="whitefont">{datestr}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
