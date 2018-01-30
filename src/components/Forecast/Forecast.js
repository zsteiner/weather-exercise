import React from 'react';
import PropTypes from 'prop-types';
import { groupWeatherByDay } from '../../utils/groupWeatherByDay';

import ForecastDay from '../ForecastDay/ForecastDay';

import styles from './Forecast.scss';

const Forecast = ({ forecast }) => {

  const forecastDays = groupWeatherByDay(forecast);
  
  const renderForecastDays = Object.keys(forecastDays).map( (day, index) => {
    return (<ForecastDay key={index} forecast={forecastDays[day]} />);
  });

  return (
    <section className={styles.forecast}>
      { renderForecastDays }
    </section>
  );
};

Forecast.propTypes = {
  forecast: PropTypes.array.isRequired
};

export default Forecast;
