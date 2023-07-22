export const getDateStr = (date) => {
  const dateObj = new Date(date);

  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const _date = dateObj.getDate();

  return `${year}.${month > 9 ? month : `0${month}`}.${_date > 9 ? _date : `0${_date}`}`;
};
