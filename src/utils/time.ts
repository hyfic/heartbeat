import moment from 'moment';

export const getToday = () => {
  return new Date(moment().format('YYYY-MM-DD')).getTime().toString();
};

export const getTomorrow = () => {
  return new Date(moment().add(1, 'day').format('YYYY-MM-DD'))
    .getTime()
    .toString();
};
