import moment from "moment";


const formatTime = (date) => {
  return moment(date).format(`hh:mm`);
};

const formatFullTime = (date) => {
  return moment(date).format(`DD/ММ/YYYY hh:mm`);
};

const formatDiffenceTime = (date) => {
  const finish = moment(date.finish);
  const days = finish.diff(date.start, `days`);
  const hours = finish.diff(date.start, `hours`) % 24;
  const minutes = finish.diff(date.start, `minutes`) % 60;

  let massege = ``;

  massege += days ? `${days}D ` : ``;
  massege += hours ? `${hours}H ` : ``;
  massege += minutes ? `${minutes}M` : ``;

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

const isOneDay = (dateA, dateB) => {
  const a = moment(dateA);
  const b = moment(dateB);
  return a.diff(b, `days`) === 0 && dateA.getDate() === dateB.getDate();
};


const isRepeating = (repeatingDays) => {
  return Object.values(repeatingDays).some(Boolean);
};

const isOverdueDate = (dueDate, date) => {
  return dueDate < date && !isOneDay(date, dueDate);
};

const isUnderdueDate = (dueDate, date) => {
  return dueDate > date && !isOneDay(date, dueDate);
};

export {isUnderdueDate, isOverdueDate, isRepeating, isOneDay, formatTime, formatDiffenceTime, groupingEventsInOrderForDays, formatFullTime, firstWordInUpper, isActiveEvent};
