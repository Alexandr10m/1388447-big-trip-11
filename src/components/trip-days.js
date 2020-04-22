import {createElement} from '../utils';

const createTripDaysTmpl = () => {
  return (
    `<ul class="trip-days">
    </ul>`
  );
};

export default class TripDays {
  constructor() {
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
