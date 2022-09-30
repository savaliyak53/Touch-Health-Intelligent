const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const dateFormat = (d: any) => {
  const t = new Date(d);
  return t.getDate() + '-' + monthNames[t.getMonth()] + '-' + t.getFullYear();
};
export const dateFormatRenewal = (d: any) => {
  const t = new Date(d);
  return t.getDate() + ' ' + monthNames[t.getMonth()] + ', ' + t.getFullYear();
};
export const onlyNumbers = (str: string) => {
  return str.replace(/[^\d]/g, '');
};
