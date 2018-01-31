import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import WeatherIcon from '../WeatherIcon/WeatherIcon';

import styles from './ForecastHour.scss';

const ForecastHour = ({ forecast }) => {
  const time = moment(forecast.dt*1000).format("h");
  const label = moment(forecast.dt*1000).format("a");
    
  return (
    <li className={styles.forecastHour}>
      <time className={styles.time}>{time}<span>{label}</span></time>
      <WeatherIcon 
        className={styles.icon}
        id={forecast.weather[0].id} 
        date={forecast.dt}
      />
      <h4 className={`temp ${styles.tempMain}`}>{Math.round(forecast.main.temp, 0)}</h4>
    </li>
  );
};

ForecastHour.propTypes = {
  forecast: PropTypes.object.isRequired
};

export default ForecastHour;
