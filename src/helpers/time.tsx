

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