import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import ForecastDay from '../ForecastDay/ForecastDay';

import styles from './Forecast.scss';

const Forecast = ({ forecast }) => {
  const groupWeatherByDay = () => {
    const days = new Map();
  
    forecast.forEach( hour => {
      const day = moment(hour.dt*1000).format("ddd MMM D")

      if( !days[day] ) {
        days[day] = [];
      }

      days[day].push(hour);
    })
    return days;
  }

  const forecastDays = groupWeatherByDay();
  
  const renderForecastDays = Object.keys(forecastDays).map( (day, index) => {
    return (<ForecastDay key={index} forecast={forecastDays[day]} day={day}/>);
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
