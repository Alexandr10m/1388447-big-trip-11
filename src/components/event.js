import {formatTime, formatDiffenceTime, firstWordInUpper, isActiveEvent} from "../utils/common.js";
import AbstractComponent from "./abstract-componenet.js";

const DISPLAY_OFFERS = 3;
const createOfferTmpl = (offers) => {
  let count = 1;
  const tmpl = [];
  for (const offer of offers) {
    if (count <= DISPLAY_OFFERS) {
      tmpl.push(`<li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
      </li>`);
      count++;
    }
  }
  return tmpl.join(``);
};

const createEventTmpl = ({typeOfPoint, city, price, offers, timeFrame}) => {

  const isEmptyEvent = !timeFrame;

  const startTimeOfEvent = isEmptyEvent ? `` : formatTime(timeFrame.start);
  const finishTimeOfEvent = isEmptyEvent ? `` : formatTime(timeFrame.finish);
  const durationTime = isEmptyEvent ? `` : formatDiffenceTime(timeFrame);

  const isOffersShowing = !!offers.length;
  const offerstMarkup = createOfferTmpl(offers);

  return `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${typeOfPoint}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${firstWordInUpper(typeOfPoint)} ${isActiveEvent(typeOfPoint) ? `in` : `to`} ${city}</h3>

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

  setEditButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }
}
