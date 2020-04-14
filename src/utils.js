const render = (container, tmpl, place = `beforeend`) => {
  container.insertAdjacentHTML(place, tmpl);
};

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

const formatDiffenceTime = (date) => {
  const diff = Math.floor(date.finish.getTime() - date.start.getTime());

  const minute = 1000 * 60;

  const minutes = Math.floor(diff / minute);
  const hours = Math.floor(minutes / 24);
  const days = Math.floor(hours / 30);
  let massege = ``;

  if (days) {
    massege += `${days}D `;
  }
  if (hours) {
    massege += `${hours}H `;
  }
  if (minutes) {
    massege += `${minutes}M`;
  }

  return massege;
};

const groupingEventsInOrderForDays = (events) => {
  const sortEvents = events.sort((first, second) => first.timeFrame.start.getTime() - second.timeFrame.start.getTime());

  const groupedEventsByDays = [];
  let day = 0;
  const dateOfFirstDay = sortEvents[0].timeFrame.start.getDate();
  let dateOfNewDay = dateOfFirstDay;
  groupedEventsByDays[day] = [];

  sortEvents.forEach((event) => {
    if (dateOfNewDay - event.timeFrame.start.getDate() === 0) {
      groupedEventsByDays[day].push(event);
    }
    if (dateOfNewDay - event.timeFrame.start.getDate() !== 0) {
      dateOfNewDay = event.timeFrame.start.getDate();
      day++;
      groupedEventsByDays[day] = [];
      groupedEventsByDays[day].push(event);
    }
  });
  return groupedEventsByDays;
};
export {render, formatTime, formatDiffenceTime, groupingEventsInOrderForDays};
