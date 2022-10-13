import moment from 'moment';

// function to generate patient Id using passed time
export const generatePID = (time: number) => {
  return moment(time).format('YYMMDDHHmm');
};
