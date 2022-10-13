import moment from 'moment';

export const getToday = () => {
  return moment().format('YYYY/M/D');
};

export const getTomorrow = () => {
  return moment().add(1, 'day').format('YYYY/M/D');
};
