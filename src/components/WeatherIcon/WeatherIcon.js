import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';

import styles from './WeatherIcon.scss';

const WeatherIcon = ({ className, date, id, inline }) => {
  const timeDay = moment(date*1000).format("H");
  const isDay = timeDay >= 6 && timeDay <= 18;

  const iconClasses = classNames({
    [styles.weatherIcon]: true,
    [styles.inline]: inline,
    [className]: className
  });

  return (
    <span className={`owf owf-${id}${isDay ? '-d' : '-n'} ${iconClasses}`}></span>
  );
};

WeatherIcon.propTypes = {
  className: PropTypes.string,
  date: PropTypes.number,
  inline: PropTypes.bool,
  id: PropTypes.number
};

export default WeatherIcon;
