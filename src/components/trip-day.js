import {MONTH_NAMES} from "../constants.js";
import AbstractComponent from "./abstract-componenet.js";


const createDayTmpl = (events, index, isGroupedByDay) => {
  const dateOfDay = isGroupedByDay ? events[0].timeFrame.start.getDate() : ``;
  const month = isGroupedByDay ? events[0].timeFrame.start.getMonth() : ``;
  const dayNumber = isGroupedByDay ? index : ``;
  const monthName = isGroupedByDay ? MONTH_NAMES[month] : ``;

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayNumber}</span>
        <time class="day__date" datetime="2019-03-18">${monthName} ${dateOfDay}</time>
      </div>
      <ul class="trip-events__list">
      </ul>
    </li>`
  );
};

export default class TripDay extends AbstractComponent {
  constructor(events, dayNumber, isGroupedByDay) {
    super();
    this._events = events;
    this._dayNumber = dayNumber;
    this._isGroupedByDay = isGroupedByDay;
  }

  getTemplate() {
    return createDayTmpl(this._events, this._dayNumber, this._isGroupedByDay);
  }
}
