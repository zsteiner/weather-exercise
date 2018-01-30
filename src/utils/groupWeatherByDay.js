import moment from 'moment';

export function groupWeatherByDay(forecast) {
  const days = new Map();

  forecast.forEach( hour => {
    const day = moment(hour.dt*1000).format("MMM D");

    if( !days[day] ) {
      days[day] = [];
    }

    days[day].push(hour);
  })
  return days;
}
