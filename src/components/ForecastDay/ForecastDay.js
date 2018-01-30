import React from 'react';
import PropTypes from 'prop-types';

import Date from '../Date/Date';
import ForecastHour from '../ForecastHour/ForecastHour';

import styles from './ForecastDay.scss';

const ForecastDay = ({ forecast, hideDate }) => {
  const forecastItems = forecast.map( (item, index) => {
    return (<ForecastHour key={index} forecast={item}/>);
  });
  
  return (
    <article className={styles.forecastDay}>
      {!hideDate ? <Date date={forecast[0].dt} /> : null }
      <ul className={styles.forecast}>
        { forecastItems }
      </ul>
    </article>
  );
};

ForecastDay.propTypes = {
  forecast: PropTypes.array.isRequired,
  hideDate: PropTypes.bool
};

export default ForecastDay;