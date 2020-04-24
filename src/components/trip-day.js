import {MONTH_NAMES} from "../constants.js";
import AbstractComponent from "./abstract-componenet.js";


const createDayTmpl = (events, dayNumber) => {
  const dateOfDay = events[0].timeFrame.start.getDate();
  const month = events[0].timeFrame.start.getMonth();

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayNumber}</span>
        <time class="day__date" datetime="2019-03-18">${MONTH_NAMES[month]} ${dateOfDay}</time>
      </div>
      <ul class="trip-events__list">
      </ul>
    </li>`
  );
};

export default class TripDay extends AbstractComponent {
  constructor(events, dayNumber) {
    super();
    this._events = events;
    this._dayNumber = dayNumber;
  }

  getTemplate() {
    return createDayTmpl(this._events, this._dayNumber);
  }
}
