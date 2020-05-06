import {MONTH_NAMES} from "../constants.js";
import AbstractComponent from "./abstract-componenet.js";


const createDayTmpl = (events, dayNumber) => {
  const isGroupedByDay = !!dayNumber;
  const dateOfDay = isGroupedByDay ? events[0].timeFrame.start.getDate() : ``;
  const month = isGroupedByDay ? events[0].timeFrame.start.getMonth() : ``;
  const day = isGroupedByDay ? dayNumber : ``;
  const monthName = isGroupedByDay ? MONTH_NAMES[month] : ``;

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${day}</span>
        <time class="day__date" datetime="2019-03-18">${monthName} ${dateOfDay}</time>
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
    return createDayTmpl(this._events, this._dayNumber, this._isGroupedByDay);
  }
}
