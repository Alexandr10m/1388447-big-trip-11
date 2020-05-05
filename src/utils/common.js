const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours());
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

const formatFullTime = (date) => {
  const dateOfDay = castTimeFormat(date.getDate());
  const hours = castTimeFormat(date.getHours());
  const minutes = castTimeFormat(date.getMinutes());
  return `${dateOfDay}/${hours}/${minutes}`;
};

const formatDiffenceTime = (date) => {
  const diffDays = date.finish.getDate() - date.start.getDate();
  const diffHours = date.finish.getHours() - date.start.getHours();
  const diffMinutes = date.finish.getMinutes() - date.start.getMinutes();

  let massege = ``;

  massege += diffDays ? `${diffDays}D ` : ``;
  massege += diffHours ? `${diffHours}H ` : ``;
  massege += diffMinutes ? `${diffMinutes}M` : ``;

  return massege;
};

const groupingEventsInOrderForDays = (events) => {
  const groupedEventsByDays = [[]];
  const dateOfFirstDay = events[0].timeFrame.start.getDate();
  let day = 0;
  let dateOfNewDay = dateOfFirstDay;

  events.forEach((event) => {
    if (dateOfNewDay === event.timeFrame.start.getDate()) {
      groupedEventsByDays[day].push(event);
    } else {
      dateOfNewDay = event.timeFrame.start.getDate();
      day++;
      groupedEventsByDays[day] = [];
      groupedEventsByDays[day].push(event);
    }
  });
  return groupedEventsByDays;
};

const firstWordInUpper = (str) => {
  const isString = typeof str === `string` || !!str;

  return isString ? str[0].toUpperCase() + str.slice(1) : str;

};

const isActiveEvent = (typeOfPoint) => {
  return typeOfPoint === `sightseeing` || typeOfPoint === `check-in` || typeOfPoint === `restaurant`;
};
export {formatTime, formatDiffenceTime, groupingEventsInOrderForDays, formatFullTime, firstWordInUpper, isActiveEvent};
