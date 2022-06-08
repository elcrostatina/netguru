import { isInt as isIntValidator } from 'class-validator';

export const isInt = (int: number): boolean => isIntValidator(int);
