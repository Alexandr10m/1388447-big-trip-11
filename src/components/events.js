import {MONTH_NAMES} from '../constants';
import {createElement} from '../utils';
import EventComponent from './event';
// import EventEditComponenet from './components/form-editor';

const getEventsByOneDayTmpl = (events, dayNumber) => {
  const dateOfDay = events[0].timeFrame.start.getDate();
  const month = events[0].timeFrame.start.getMonth();
  const eventsMarkup = events.map((event) => new EventComponent(event).getTemplate()).join(``);

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayNumber}</span>
        <time class="day__date" datetime="2019-03-18">${MONTH_NAMES[month]} ${dateOfDay}</time>
      </div>
      <ul class="trip-events__list">
        ${eventsMarkup}
      </ul>
    </li>`
  );
};

const getEvenstsforAllDaysTmpl = (eventsByDays) => {
  const eventsByDaysMarkup = eventsByDays.map((eventsByOneDay, index) => getEventsByOneDayTmpl(eventsByOneDay, index + 1)).join(``);
  return (
    `<ul class="trip-days">
      ${eventsByDaysMarkup}
    </ul>`
  );
};

export default class Events {
  constructor(events) {
    this._events = events;
    this._element = null;
  }

  getTemplate() {
    return getEvenstsforAllDaysTmpl(this._events);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
