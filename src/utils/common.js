const convertMsToTime = (s) => {
  const dateObj = new Date(s);
  console.log('DATEE ', dateObj);
  const hours = dateObj.getUTCHours();
  const minutes = dateObj.getUTCMinutes();
  const seconds = dateObj.getUTCSeconds();

  console.log('Hours ', hours);

  const timeFormat = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  return timeFormat;
};

export default convertMsToTime;
