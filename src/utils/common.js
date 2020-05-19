import moment from "moment";


const formatTime = (date) => {
  return moment(date).format(`hh:mm`);
};

const formatFullTime = (date) => {
  return moment(date).format(`DD/MM/YYYY hh:mm`);
};

const formatDiffDays = (event) => {
  const end = moment(event.timeFrame.finish);
  return end.diff(event.timeFrame.start);
};

const formatDay = (time) => {
  const isTime = !!time;
  return isTime ? Math.round(time / 86400000) : 0;
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

const sortedEventsByTime = (events) => {
  if (events.length === 0) {
    return false;
  }
  return events.sort((prev, next) => {
    return prev.timeFrame.start.getTime() - next.timeFrame.start.getTime();
  });
};

const getTripInfo = (events) => {
  const sortedEvents = sortedEventsByTime(events.slice());

  if (!sortedEvents) {
    return false;
  }

  let intermediatePoint = false;
  let dateEnd = false;
  let price = 0;

  if (sortedEvents.length === 1) {
    dateEnd = sortedEvents[0].timeFrame.finish;
  }
  if (sortedEvents.length > 3) {
    intermediatePoint = `...`;
  }
  if (sortedEvents.length === 3) {
    intermediatePoint = sortedEvents[1].city;
  }

  sortedEvents.forEach((it) => {
    price = price + it.price;
  });

  return {
    startPoint: sortedEvents.length ? sortedEvents[0].city : false,
    intermediatePoint,
    endPoint: sortedEvents.length > 1 ? sortedEvents[sortedEvents.length - 1].city : false,
    dateStart: sortedEvents.length ? sortedEvents[0].timeFrame.start : false,
    dateEnd: sortedEvents.length > 1 ? sortedEvents[sortedEvents.length - 1].timeFrame.finish : dateEnd,
    price,
  };
};

export {formatDay, formatDiffDays, getTripInfo, isUnderdueDate, isOverdueDate, isRepeating, isOneDay, formatTime, formatDiffenceTime, groupingEventsInOrderForDays, formatFullTime, firstWordInUpper, isActiveEvent};
