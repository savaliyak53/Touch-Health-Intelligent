

export const getPartOfDay = (): string => {
  const currentHour: number = new Date().getHours();

  if (currentHour >= 0 && currentHour < 6) {
    return "night";
  } else if (currentHour >= 6 && currentHour < 12) {
    return "morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "afternoon";
  } else {
    return "evening";
  }
}

export const getDayOfWeekByDate = (date: string): string => {
  const days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const parsedDate = new Date(date);
  return days[parsedDate.getDay()];
}

export const getDayOfWeekFromToday = (date: string, i: number): string => {
  const currentDate: Date = new Date();

  const tomorrow: Date = new Date(currentDate);
  tomorrow.setDate(currentDate.getDate() + i);
  const daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return daysOfWeek[tomorrow.getDay()];
}

export const checkDateDifference = (date: string, index: number): boolean => {
  const today: Date = new Date();
  const targetDate: Date = new Date(date);
  const differenceInMilliseconds: number = targetDate.getTime() - today.getTime();
  const differenceInDays: number = Math.ceil(differenceInMilliseconds / (24 * 60 * 60 * 1000));
  console.log(differenceInDays, index);
  console.log('=========');
  return differenceInDays === index;
};