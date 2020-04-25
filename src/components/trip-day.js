import {MONTH_NAMES} from "../constants.js";
import AbstractComponent from "./abstract-componenet.js";


const createDayTmpl = (events, index, sortType) => {
  // sortType тут лишний
  let dateOfDay = ``;
  let month = ``;
  let dayNumber = ``;
  let monthName = ``;
  // мне кажется if тут лишний
  if (sortType === `data-event`) {
    dateOfDay = events[0].timeFrame.start.getDate();
    month = events[0].timeFrame.start.getMonth();
    dayNumber = index;
    monthName = MONTH_NAMES[month];
  }

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
  constructor(events, dayNumber, sortType) {
    super();
    this._events = events;
    this._dayNumber = dayNumber;
    this._sortType = sortType;
  }

  getTemplate() {
    return createDayTmpl(this._events, this._dayNumber, this._sortType);
  }
}
