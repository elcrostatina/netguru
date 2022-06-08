import * as moment from 'moment';
import { isDate as isDateValidator } from 'class-validator';

export const addDays = (params: { date: Date; daysToAdd: number }): Date => {
  return moment(params.date).add(params.daysToAdd, 'day').toDate();
};

export const isAfter = (first: Date, second: Date): boolean => {
  return moment(first).isAfter(second);
};

export const getYearMonth = (date: Date): string => {
  return moment(date).format('YYYY-MM');
};

export const setTime = (params: {
  date: Date;
  hours: number;
  minutes: number;
}): Date => {
  return moment(params.date)
    .set('hour', params.hours)
    .set('minute', params.minutes)
    .toDate();
};

export const addMonths = (date: Date, months: number): Date => {
  return moment(date).add(months, 'month').toDate();
};

export const isDate = (date: Date): boolean => isDateValidator(date);
