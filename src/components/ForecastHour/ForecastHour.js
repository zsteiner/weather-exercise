import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import styles from './ForecastHour.scss';

const ForecastHour = ({ forecast }) => {
  const time = moment(forecast.dt*1000).format("h a");
  const conditions = forecast.weather[0].main;
  const timeDay = moment(forecast.dt*1000).format("a");
  const isDay = timeDay === 'am';
    
  return (
    <li className={styles.forecastHour}>
      <time className={styles.time}>{time}</time>
      <span className={`owf owf-${forecast.weather[0].id}${isDay ? '-d' : '-n'} ${styles.weatherIcon}`} alt={conditions} tooltip={conditions}></span>
      <h4 className={`temp ${styles.tempMain}`}>{Math.round(forecast.main.temp, 0)}</h4>
    </li>
  );
};

ForecastHour.propTypes = {
  forecast: PropTypes.object.isRequired
};

export default ForecastHour;
