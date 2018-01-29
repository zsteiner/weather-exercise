import React, { Component } from 'react';
import axios from 'axios';

import Forecast from './components/Forecast/Forecast';

import styles from './App.scss';

const apiKey = '321fd12b634b2f982e572096615c201a';

class App extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      zipcode: 80014,
      city:'Indianapolis',
      forecast: [],
      lat: 0,
      lon: 0,
      units: 'imperial'
    };
  }
  
  getWeatherData = () => {
    const zipAPI = `http://api.openweathermap.org/data/2.5/forecast?zip=${this.state.zipcode},us&units=${this.state.units}&APPID=${apiKey}`;
    // const coordinateAPI = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${this.state.units}&APPID=${apiKey}`;
    axios
      .get(zipAPI)
      .then(response => {
        // console.log('response', response.data);
        this.setState({
          city: response.data.city.name,
          forecast: response.data.list
        });
      })
      .catch(err => {
        console.log('Error happened during fetching!', err);
      });
  }   
  
  render() {
    return (
      <article className={styles.app}>
        <header className={styles.header}>
          <input type="text" placeholder='Enter Zip Code'/>
          <button onClick={this.getWeatherData}>get me weather</button>       
        </header>
        <h1 className={styles.city}>5 Day Forecast for {this.state.city}</h1>
        <Forecast forecast={this.state.forecast} />
      </article>
    );
  }
}

export default App;
