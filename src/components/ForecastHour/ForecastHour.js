import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import styles from './ForecastHour.scss';

const ForecastHour = ({ forecast }) => {
  const conditions = forecast.weather[0].main;
  return (
    <li className={styles.forecastHour}>
      <time className={styles.time}>{moment(forecast.dt*1000).format("h a")}</time>
      <img src={`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`} className={styles.weatherIcon} alt={conditions} tooltip={conditions}/>
      <h4 className={`temp ${styles.tempMain}`}>{Math.round(forecast.main.temp, 0)}</h4>
    </li>
  );
};

ForecastHour.propTypes = {
  forecast: PropTypes.object.isRequired
};

export default ForecastHour;
