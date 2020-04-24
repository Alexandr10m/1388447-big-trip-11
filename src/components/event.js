import {formatTime, formatDiffenceTime} from '../utils';
import AbstractComponent from './abstract-componenet';

const createOfferTmpl = ({title, price}) => {
  return (
    `<li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${price}</span>
    </li>`
  );
};

const createEventTmpl = ({typeOfPoint, city, price, offers, timeFrame}) => {

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

export default class Event extends AbstractComponent {
  constructor(dataEvent) {
    super();
    this._dataEvent = dataEvent;
  }

  getTemplate() {
    return createEventTmpl(this._dataEvent);
  }
}
