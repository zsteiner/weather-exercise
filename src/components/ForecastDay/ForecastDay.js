import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Date from '../Date/Date';
import ForecastHour from '../ForecastHour/ForecastHour';

import styles from './ForecastDay.scss';

const ForecastDay = ({ forecast, hideDate, twoRow }) => {
  const forecastItems = forecast && forecast.map( (item, index) => {
    return (<ForecastHour key={index} forecast={item} />);
  });

  const forecastClasses = classNames({
    [styles.forecast]: true,
    [styles.twoRow]: twoRow,
  });
  
  return (
    <article className={styles.forecastDay}>
      {!hideDate ? <Date date={forecast[0].dt} /> : null }
      <ul className={forecastClasses}>
        { forecastItems }
      </ul>
    </article>
  );
};

ForecastDay.propTypes = {
  forecast: PropTypes.array.isRequired,
  hideDate: PropTypes.bool,
  twoRow: PropTypes.bool
};

export default ForecastDay;