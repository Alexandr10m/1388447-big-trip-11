const render = (container, tmpl, place = `beforeend`) => {
  container.insertAdjacentHTML(place, tmpl);
};

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours());
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

const formatDiffenceTime = (date) => {

  const diffDays = date.finish.getDate() - date.start.getDate();
  const diffHours = date.finish.getHours() - date.start.getHours();
  const diffMinutes = date.finish.getMinutes() - date.start.getMinutes();


  let massege = ``;

  if (diffDays) {
    massege += `${diffDays}D `;
  }
  if (diffHours) {

    massege += `${diffHours}H `;
  }
  if (diffMinutes) {
    massege += `${diffMinutes}M`;
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
