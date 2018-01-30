import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { groupWeatherByDay } from '../../utils/groupWeatherByDay';

import styles from './CurrentWeather.scss';

import Date from '../Date/Date';
import ForecastDay from '../ForecastDay/ForecastDay';
import WeatherIcon from '../WeatherIcon/WeatherIcon';

const CurrentWeather = ({ currentWeather, forecast }) => {
  
  const currentTemp = currentWeather.main && Math.round(currentWeather.main.temp, 0);
  const conditions = currentWeather.weather[0].main;
 
  const today = moment().format("MMM D");
  const groupedByDay = groupWeatherByDay(forecast);
  const forecastToday = groupedByDay.get('Jan 30');
  
  console.log('forecastToday', today, groupedByDay, forecastToday);
  
  return (
    <aside className={styles.currentWeather}>
      <Date 
        className={styles.currentDate} 
        date={currentWeather.dt}
      />
      <section className={styles.currentWeatherDetails}>
        <h2 className={`temp ${styles.currentTemp}`}>{ currentTemp }</h2>
        <div className={styles.currentConditions}>
          <p className={styles.currentConditionsItem}>
            <WeatherIcon 
              className={styles.icon}
              date={currentWeather.dt}
              id={currentWeather.weather[0].id}
              inline 
            />
            { conditions }
          </p>
          <p className={styles.currentConditionsItem}>
            <WeatherIcon 
              className={styles.icon}
              date={currentWeather.dt}
              id={956}
              inline 
            />
            { `${currentWeather.wind.speed} mph`}
          </p>
        </div>
      </section>
      <h3 className={styles.hourlyHeading}>Hourly</h3>
      {/* <ForecastDay forecast={forecastToday} hideDate /> */}
    </aside>
  );
};

CurrentWeather.propTypes = {
  currentWeather: PropTypes.object.isRequired,
  forecast: PropTypes.array.isRequired
};

export default CurrentWeather;
