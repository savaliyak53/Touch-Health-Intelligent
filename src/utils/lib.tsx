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
const monthNum = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
];
const day = [
  'S',
  'M',
  'T',
  'W',
  'T',
  'F',
  'S',
];
export const dateFormat = (d: any) => {
  const t = new Date(d);
  return t.getDate() + '-' + monthNames[t.getMonth()] + '-' + t.getFullYear();
};
export const dateFormatted = (d: Date) => {
  return d.getFullYear() +'-'+ monthNum[d.getMonth()] + '-' +d.getDate() ;
};
export const dateFormatRenewal = (d: any) => {
  const t = new Date(d);
  return t.getDate() + ' ' + monthNames[t.getMonth()] + ', ' + t.getFullYear();
};
export const onlyNumbers = (str: string) => {
  return str.replace(/[^\d]/g, '');
};
export const getDayInitial = (index:number) =>{
  return day[index];
}