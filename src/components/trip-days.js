import AbstractComponent from "./abstract-componenet.js";


const createTripDaysTmpl = () => {
  return (
    `<ul class="trip-days">
    </ul>`
  );
};

export default class TripDays extends AbstractComponent {
  getTemplate() {
    return createTripDaysTmpl(this._events);
  }
}
