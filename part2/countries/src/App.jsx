import { useState, useEffect } from "react";
import axios from 'axios';

const Country = ({ country, weather }) => {
  if (!country) return null;

  return (
    <div>
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area} km<sup>2</sup></p>
        <h3>Languages</h3>
        <ul>
          {Object.values(country.languages).map((lan, index) => <li key={index}>{lan}</li>)}
        </ul>
        <img src={country.flags.png} alt={country.name.common} />
      </div>
      {weather &&(
        <div>
        <h3>Weather in {country.capital}</h3>
        <p>Temperature: {weather.main.temp} °C</p>
        <p>Weather: {weather.weather[0].description}</p>
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={`Weather in ${country.capital}`}
        />
        <p>wind {weather.wind.speed} m/s</p>
      </div>
      )}
    </div>
  );
};

const Countries = ({ countriesFilter, handleClick }) => {
  if (countriesFilter.length === 0) {
    return <p>Country Not Found</p>
  } 
  if (countriesFilter.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } 
  return (
    <ul>
      {countriesFilter.map(country => 
        <li key={country.cca2}>
          {country.name.common} <button onClick={() => handleClick(country)}>show</button>
        </li>
      )}
    </ul>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data);
      });
  }, []);

  useEffect(() => {
    const countriesFilter = countries.filter(country =>
      country.name.common.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );

    if (countriesFilter.length === 1) {
      fetchWeather(countriesFilter[0].capital[0]);
      setSelectedCountry(countriesFilter[0]);
    } else {
      setWeather(null);
      setSelectedCountry(null);
    }
  }, [filter, countries]);

  const fetchWeather = (capital) => {
    const apiKey = import.meta.env.VITE_API_WEATHER
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`)
      .then(response => {
        setWeather(response.data);
      });
  };

  const handleChange = (event) => setFilter(event.target.value);


  const handleClick = (country) => {
    console.log(country);
    setSelectedCountry(country);
    fetchWeather(country.capital[0]);
  };

  const countriesFilter = countries.filter(country => country.name.common.toLocaleLowerCase().includes(filter.toLocaleLowerCase()));

  return (
    <div>
      find countries: <input value={filter} onChange={handleChange} />
      {selectedCountry ? (
        <Country country={selectedCountry} weather={weather} />
      ) : (
        <Countries countriesFilter={countriesFilter} handleClick={handleClick} />
      )}
    </div>
  );
};

export default App;