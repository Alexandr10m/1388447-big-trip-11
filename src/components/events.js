import {MONTH_NAMES} from '../constants';
import {createElement, formatTime, formatDiffenceTime} from '../utils';

const createOfferTmpl = ({title, price}) => {
  return (
    `<li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${price}</span>
    </li>`
  );
};
const getEventTmpl = ({typeOfPoint, city, price, offers, timeFrame}) => {

  const isActiveEvent = typeOfPoint === `Sightseeing` || typeOfPoint === `Check-in` || typeOfPoint === `Restaurant`;

  const startTimeOfEvent = formatTime(timeFrame.start);
  const finishTimeOfEvent = formatTime(timeFrame.finish);
  const durationTime = formatDiffenceTime(timeFrame);

  const isOffersShowing = !!offers.length;
  const offerstMarkup = offers.map((offer) => createOfferTmpl(offer)).join(``);

  return `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${typeOfPoint}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${typeOfPoint} ${isActiveEvent ? `in` : `to`} ${city}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">${startTimeOfEvent}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">${finishTimeOfEvent}</time>
        </p>
        <p class="event__duration">${durationTime}</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      ${isOffersShowing ?
    `<ul class="event__selected-offers">
        ${offerstMarkup}
      </ul>` : ``}
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
    </li>`;
};

const getEventsByOneDayTmpl = (events, dayNumber) => {
  const dateOfDay = events[0].timeFrame.start.getDate();
  const month = events[0].timeFrame.start.getMonth();
  const eventsMarkup = events.map((event) => getEventTmpl(event)).join(``);

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
