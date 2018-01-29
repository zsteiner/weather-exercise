import React from 'react';
import PropTypes from 'prop-types';

import ForecastHour from '../ForecastHour/ForecastHour';

import styles from './ForecastDay.scss';

const ForecastDay = ({ day, forecast }) => {
  const forecastItems = forecast.map( (item, index) => {
    return (<ForecastHour key={index} forecast={item}/>);
  });

  return [
    <h3 key={0} className={styles.day}>{day}</h3>,
    <ul key={1} className={styles.forecast}>
      { forecastItems }
    </ul>
  ];
};

ForecastDay.propTypes = {
  day: PropTypes.string.isRequired,
  forecast: PropTypes.array.isRequired
};

export default ForecastDay;