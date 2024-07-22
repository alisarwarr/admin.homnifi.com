import React from 'react';
import {
  addMonths,
  differenceInDays,
  differenceInMilliseconds,
  differenceInMonths,
  format,
  parseISO,
} from 'date-fns';
import { enUS } from 'date-fns/locale';

export function getRandomColor() {
  const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  return color;
}

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = React.useState({
    width: 0,
    height: 0,
  });

  React.useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export const getTableIndexNumber = ({
  index,
  limit,
  page,
}: {
  page: number;
  index: number;
  limit: number;
}) => {
  return (page - 1) * limit + (index + 1);
};

export const formatDateFns = (inputDate: string, Dateformat?: string) => {
  if (inputDate) {
    const desiredFormat = 'yyyy-MM-dd HH:mm:ss';

    const formattedDate = format(
      new Date(inputDate),
      Dateformat ? Dateformat : desiredFormat
    );

    return formattedDate;
  }
};

export const formatStringToDOB = (isoDateString: string) => {
  if (isoDateString) {
    const date = parseISO(isoDateString);

    const formattedDate = format(date, 'yyyy-MM-dd');

    return formattedDate.toString();
  }
};

export const formatToUpperCase = (date: any) => {
  const formattedDate = format(date, 'dd MMMM yyyy', { locale: enUS });
  return formattedDate.replace(/(\b\w+\b)/g, (match, p1, offset) =>
    offset === 3 ? p1.toUpperCase() : p1
  );
};

export function transformDataNameValue(
  data: [
    {
      code: string;
      name: string;
      disabled: boolean;
    },
  ]
) {
  return data.map((item) => ({
    name: item.name,
    value: item.code,
  }));
}

export function formatDuration(dateString: string) {
  const currentDate = new Date();
  const parsedDate = parseISO(dateString);

  const totalMonths = differenceInMonths(parsedDate, currentDate);
  const remainingDate = addMonths(currentDate, totalMonths);
  const totalDays = differenceInDays(parsedDate, remainingDate);

  return {
    totalMonths,
    remainingDate,
    totalDays,
    formattedData: `${totalMonths} Month${totalMonths !== 1 ? 's' : ''} ${totalDays} Day${totalDays !== 1 ? 's' : ''}`,
  };
}

export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);

  // Extract date components
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = date.getUTCFullYear();

  // Extract time components
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');

  // Combine into the desired format
  return `${day}-${month}-${year} - ${hours}:${minutes}`;
}

export function isIsoDateString(value: any): boolean {
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
  return typeof value === 'string' && isoDateRegex.test(value);
}

export function formatOnlyDate(isoDate: string): string {
  const date = new Date(isoDate);

  // Extract date components
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = date.getUTCFullYear();

  // Combine into the desired format
  return `${day}-${month}-${year}`;
}

export const getDatePercentage = (startDate: string, endDate: string) => {
  const currentDate = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  const totalDuration = differenceInMilliseconds(end, start);
  const durationPassed = differenceInMilliseconds(currentDate, start);

  if (durationPassed <= 0) return 0; // If the current date is before the start date
  if (durationPassed >= totalDuration) return 100; // If the current date is after the end date

  return (durationPassed / totalDuration) * 100;
};

export function calculateDailyCompoundInterest(
  principal: number,
  rate: number,
  years: number
) {
  const rateDecimal = rate / 100;
  const timesCompounded = 365;
  const amount =
    principal *
    Math.pow(1 + rateDecimal / timesCompounded, timesCompounded * years);
  return amount;
}

export function calculateSimpleInterestDaily(
  principal: number,
  dailyRate: number,
  days: number
): number {
  const interest = principal * (dailyRate / 100) * days;
  const amount = principal + interest;
  return amount;
}

export function getFinalCompoundedValue(
  autoCompound: boolean,
  principal: number,
  rate: number,
  years: number
) {
  if (autoCompound) {
    return calculateDailyCompoundInterest(principal, rate, years);
  } else {
    return calculateSimpleInterestDaily(principal, rate, years);
  }
}

export function getRewardsPercentage(totalRewards: number, collatoral: number) {
  return (totalRewards / collatoral) * 100;
}
