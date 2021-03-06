import React, { Component } from "react";
import axios from "axios";

import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import Forecast from "./components/Forecast/Forecast";

import styles from "./App.scss";

const apiKey = "321fd12b634b2f982e572096615c201a";
const apiKeyGoogle = "AIzaSyAVlJKciYbYy1oG2I-s2LcPVNl1qKJbC14";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentWeather: null,
      city: "",
      error: null,
      forecast: null,
      fetchingLocation: false,
      lat: 0,
      lon: 0,
      units: "imperial",
      zipcode: ""
    };
  }

  componentDidMount() {
    this.getLocation();
  }

  getForecast = () => {
    this.getForecastData();
    this.getCurrentWeatherData();
  };

  getForecastData = () => {
    const { lat, lon, units, zipcode } = this.state;

    const zipAPI = `https://api.openweathermap.org/data/2.5/forecast?zip=${zipcode},us&units=${units}&APPID=${apiKey}`;
    const coordinateAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&APPID=${apiKey}`;
    const api = lat && lon && !zipcode ? coordinateAPI : zipAPI;

    axios
      .get(api)
      .then(response => {
        this.setState({
          forecast: response.data.list,
          error: null
        });
      })
      .catch(err => {
        console.log("Error happened during fetching!", err);
        this.setState({
          forecast: null,
          error: "There was a problem getting forecast data. Try again."
        });
      });
  };

  getCurrentWeatherData = () => {
    const { lat, lon, units, zipcode } = this.state;

    const zipAPI = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&units=${units}&APPID=${apiKey}`;
    const coordinateAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&APPID=${apiKey}`;
    const api = lat && lon && !zipcode ? coordinateAPI : zipAPI;

    axios
      .get(api)
      .then(response => {
        this.setState({
          city: response.data.name,
          currentWeather: response.data,
          error: null
        });
      })
      .catch(err => {
        console.log("Error happened during fetching!", err);
        this.setState({
          currentWeather: null,
          error: "There was a problem getting current weather data. Try again."
        });
      });
  };

  updateZip = event => {
    const zipcode = event.target.value;

    this.setState({
      zipcode: zipcode
    });
  };

  inputSubmit = event => {
    if (event.which === 13 || event.keyCode === 13) {
      this.getForecast();
    }
  };

  getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        this.setState(
          {
            lat: lat,
            lon: lon
          },
          this.lookUpLocation(lat, lon)
        );
      },
      error => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  lookUpLocation = (lat, lon) => {
    const api = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKeyGoogle}`;

    this.setState({
      fetchingLocation: true
    });

    axios
      .get(api)
      .then(response => {
        this.setState(
          {
            zipcode: response.data.results[0].address_components[8].long_name,
            fetchingLocation: false,
            error: null
          },
          this.getForecast()
        );
      })
      .catch(err => {
        this.setState({
          error: "There was a problem looking up your zip code."
        });
        console.log("Error happened during fetching!", err);
      });
  };

  render() {
    const {
      city,
      currentWeather,
      error,
      fetchingLocation,
      forecast,
      zipcode
    } = this.state;

    return (
      <div className={styles.app}>
        <header className={styles.header}>
          {fetchingLocation ? (
            <span className={`${styles.locationButton} loader`}>
              loading ...{" "}
            </span>
          ) : (
            <button
              onClick={this.getLocation}
              className={styles.locationButton}
            >
              <svg
                className="icon"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 5.09C6.393 5.09 5.09 6.394 5.09 8c0 1.607 1.303 2.91 2.91 2.91 1.607 0 2.91-1.303 2.91-2.91 0-1.607-1.303-2.91-2.91-2.91zm6.502 2.183c-.335-3.033-2.742-5.44-5.775-5.775V0H7.273v1.498c-3.033.335-5.44 2.742-5.775 5.775H0v1.454h1.498c.335 3.033 2.742 5.44 5.775 5.775V16h1.454v-1.498c3.033-.335 5.44-2.742 5.775-5.775H16V7.273h-1.498zM8 13.09c-2.815 0-5.09-2.276-5.09-5.091 0-2.815 2.275-5.09 5.09-5.09S13.09 5.184 13.09 8 10.816 13.09 8 13.09z"
                />
              </svg>{" "}
              Get my location
            </button>
          )}
          <input
            type="text"
            placeholder="Enter Zip Code"
            onChange={this.updateZip}
            onKeyPress={this.inputSubmit}
            className={styles.zipcode}
            value={zipcode}
          />
          <button onClick={this.getForecast} className={styles.submitButton}>
            Get My Forecast
          </button>
          {!error && city ? (
            <h1 className={styles.city}>Forecast for {city}</h1>
          ) : null}
        </header>
        {error || !currentWeather || !forecast ? (
          <p className={styles.error}>{error}</p>
        ) : (
          <div className={styles.forecastBody}>
            {
              <CurrentWeather
                currentWeather={currentWeather}
                forecast={forecast}
              />
            }
            <Forecast forecast={forecast} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
