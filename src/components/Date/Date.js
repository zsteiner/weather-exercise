import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';

import styles from './Date.scss';

const Date = ({ className, date }) => {
  const day = moment(date*1000).format("dddd");
  const dateFormatted = moment(date*1000).format("MMM D");
  
  const dateClasses = classNames({
    [styles.dateHeader]: true,
    [className]: className
  });

  return (
    <header className={dateClasses}>
      <h3 className={styles.day}>{day}</h3>
      <h4 className={styles.date}>{dateFormatted}</h4>
    </header>
  );
};

Date.propTypes = {
  className: PropTypes.string,
  date: PropTypes.number.isRequired
};

export default Date;
