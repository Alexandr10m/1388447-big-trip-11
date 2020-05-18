import {FilterType} from "../constants";
import {isUnderdueDate, isOverdueDate} from "../utils/common.js";


const filteredEventsByFuture = (events, nowDate) => {
  return events.filter((event) => {
    const dueDate = event.timeFrame.start;

    if (!dueDate) {
      return false;
    }

    return isUnderdueDate(dueDate, nowDate);
  });
};

const filteredEventsByPast = (events, nowDate) => {
  return events.filter((event) => {
    const dueDate = event.timeFrame.start;

    if (!dueDate) {
      return false;
    }

    return isOverdueDate(dueDate, nowDate);
  });
};

const getFilteredEvents = (events, filterType) => {
  const nowDate = new Date();

  switch (filterType) {
    case FilterType.EVERYTHING:
      return events.slice();

    case FilterType.FUTURE:
      return filteredEventsByFuture(events, nowDate);

    case FilterType.PAST:
      return filteredEventsByPast(events, nowDate);
  }
  return events;
};

export {getFilteredEvents};
