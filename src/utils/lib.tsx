import jwt_decode from 'jwt-decode';
import jwt from 'jwt-decode';

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
const day = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
export const dateFormat = (d: any) => {
  const t = new Date(d);
  return t.getDate() + '-' + monthNames[t.getMonth()] + '-' + t.getFullYear();
};
export const dateFormatted = (d: Date) => {
  return (
    d.getFullYear() +
    '-' +
    monthNum[d.getMonth()] +
    '-' +
    d.getDate().toString().padStart(2, '0')
  );
};
export const dateFormatRenewal = (d: any) => {
  const t = new Date(d);
  return t.getDate() + ' ' + monthNames[t.getMonth()] + ', ' + t.getFullYear();
};
export const onlyNumbers = (str: string) => {
  return str.replace(/[^\d]/g, '');
};
export const getDayInitial = (index: number) => {
  return day[index];
};
export const signupFlow = (pathname: any) => {
  if (
    pathname === '/login' ||
    pathname === '/terms-and-conditions' ||
    pathname === '/security' ||
    pathname === '/verification-code' ||
    pathname === '/password-reset' ||
    pathname === '/existing-user'  ||
    pathname === '/signup'

  ) {
    return true;
  }
  return false;
};
export const timeFrom = (X: any) => {
  const dates = [];
  for (let I = 0; I < Math.abs(X); I++) {
    const thisDate = new Date(
      new Date().getTime() - (X >= 0 ? I : I - I - I) * 24 * 60 * 60 * 1000
    );
    dates.push([dateFormatted(thisDate), getDayInitial(thisDate.getDay())]);
  }
  return dates;
};
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
export const getTokenExpiration = (token: string) => {
  const decodedToken: any = jwt_decode(token);
  return decodedToken.exp;
};
export const getUser = (token: string) => {
  const user: any = jwt(token);
  return user.id;
};
export const getSession = (token: string) => {
  const user: any = jwt(token);
  return user.sid;
};

export const validateNumber = (num: string) => {
  if(num.charAt(0) !== '+') return '+' + num
  else return num
}
