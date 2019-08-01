import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [country, setCountry] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [weather, getWeather] = useState({});
  const [hasfetchedWeather, setHasfetchedWeather] = useState(false);

  useEffect(() => {
    fetchCountryData(country);
  }, [country]);

  const fetchCountryData = countryStr => {
    const endPoint = "https://restcountries.eu/rest/v2/name/";

    axios.get(`${endPoint}${countryStr}`).then(res => {
      setCountryList(res.data);
      filterCountryData();
    });
  };

  const searchCountry = event => {
    setCountry(event.target.value);
  };

  const showCountry = countryStr => {
    fetchCountryData(countryStr);
  };

  const filterCountryData = () => {
    if (countryList.length === 1) {
      return (
        <>
          <h2>{countryList[0].name}</h2>
          <p>capital: {countryList[0].capital}</p>
          <p>population: {countryList[0].population}</p>
          <h2>languages</h2>
          <ul>
            {countryList[0].languages.map(language => {
              return <li>{language.name}</li>;
            })}
          </ul>
          <img style={{ maxWidth: 400 + "px" }} src={countryList[0].flag} />
        </>
      );
    } else if (countryList.length <= 10) {
      return countryList.map(country => {
        return (
          <>
            <li key={country.name}>{country.name}</li>
            <button onClick={() => showCountry(country.name)}>show</button>
          </>
        );
      });
    } else {
      return "Too many matches, specify another filter";
    }
  };

  return (
    <div>
      <div>
        find countries <input value={country} onChange={searchCountry} />
      </div>
      <div>
        <ul>{filterCountryData()}</ul>
      </div>
    </div>
  );
};

export default App;
