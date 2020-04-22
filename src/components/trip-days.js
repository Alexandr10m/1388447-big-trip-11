import {createElement} from '../utils';
import {createDayTmpl} from './trip-day';

const createTripDaysTmpl = (events) => {
  const daysMarkup = events.map((eventsByOneDay, index) => createDayTmpl(eventsByOneDay, index + 1)).join(``);
  return (
    `<ul class="trip-days">
      ${daysMarkup}
    </ul>`
  );
};

export default class TripDays {
  constructor(events) {
    this._events = events;
    this._element = null;
  }

  getTemplate() {
    return createTripDaysTmpl(this._events);
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
