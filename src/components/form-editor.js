import {TYPE_OF_TRIP_POINT} from "../constants.js";
import {CITYES, OFFERS, getRandomArrayLength, getRandomArrayItem, DESTINATION} from "../mock/event.js";
import {formatFullTime, firstWordInUpper, isActiveEvent} from "../utils/common.js";
import AbstractSmartComponent from "./abstract-smart-component.js";

const createDestinationPhotoTmpl = (photos) => {
  const imgList = photos.map((photo) => `<img class="event__photo" src="${photo}" alt="Event photo">`).join(``);
  return imgList;
};
const createListOfCityesTmpl = (cityes) => {
  const listOfCityes = cityes.map((city) => `<option value="${city}"></option>`);
  return listOfCityes;
};
const createListEventTypeTmpl = (eventsTypes, checked) => {
  const allEvents = eventsTypes.map((event, index) => {
    const isChecked = eventsTypes[index] === checked ? `checked` : ``;
    return (
      `<div class="event__type-item">
        <input id="event-type-${event}-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${event}" ${isChecked}>
        <label class="event__type-label  event__type-label--${event}" for="event-type-${event}-indexDay">${event}</label>
      </div>`
    );
  });

  const transferEvents = allEvents.filter((event, index) => index < 7).join(``);
  const activeEvents = allEvents.filter((event, index) => index >= 7).join(``);
  return (
    `<fieldset class="event__type-group">
    <legend class="visually-hidden">Transfer</legend>
    ${transferEvents}
  </fieldset>

  <fieldset class="event__type-group">
    <legend class="visually-hidden">Activity</legend>
    ${activeEvents}
  </fieldset>`
  );
};
const createOffersTmpl = (offers) => {
  const offersMarkup = offers.map((offer, index) => {
    const isChecked = index === 0 || index === 1 ? `checked=""` : ``;
    return `
    <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.name}-${index}" type="checkbox" name="event-offer-${offer.name}" ${isChecked}>
    <label class="event__offer-label" for="event-offer-${offer.name}-${index}">
      <span class="event__offer-title">${offer.title}</span>
      +
      €&nbsp;<span class="event__offer-price">${offer.price}</span>
    </label>
  </div>`;
  }).join(``);

  return offersMarkup;
};
const createFormEditorTmpl = (event, option) => {
  const {price, timeFrame, isFavourite} = event;
  const {typeOfPoint, city, offers, destination} = option;
  const index = 1;
  const timeStart = formatFullTime(timeFrame.start);
  const timeEnd = formatFullTime(timeFrame.finish);
  const optionsOfTypeEventMarkup = createListEventTypeTmpl(TYPE_OF_TRIP_POINT, typeOfPoint);
  const optionsOfCityMarkup = createListOfCityesTmpl(CITYES);
  const preposition = isActiveEvent(typeOfPoint) ? `in` : `to`;

  const isOffersShowing = !!offers.length;
  const offersMarkup = isOffersShowing ? createOffersTmpl(offers) : ``;

  const destinationPhotosMarkup = createDestinationPhotoTmpl(destination.photos);
  const isDistinationShowing = !!destination.description;

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-${index}">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${typeOfPoint}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${index}" type="checkbox">

          <div class="event__type-list">
            ${optionsOfTypeEventMarkup}
          </div>
        </div>
        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-${index}">
            ${firstWordInUpper(typeOfPoint)} ${preposition}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-${index}" type="text" name="event-destination" value="${city}" list="destination-list-${index}">
          <datalist id="destination-list-${index}">
          ${optionsOfCityMarkup}
          </datalist>
        </div>
        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-${index}">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-${index}" type="text" name="event-start-time" value="${timeStart} 00:00">
          &mdash;
          <label class="visually-hidden" for="event-end-time-${index}">
            ${firstWordInUpper(preposition)}
          </label>
          <input class="event__input  event__input--time" id="event-end-time-${index}" type="text" name="event-end-time" value="${timeEnd} 00:00">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-${index}">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-${index}" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
        <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavourite ? `checked` : ``}>
        <label class="event__favorite-btn" for="event-favorite-1">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </label>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>

      <section class="event__details">
        ${isOffersShowing ?
      `<section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
            ${offersMarkup}
          </div>
        </section>` : ``}

        ${isDistinationShowing ?
      `<section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destination.description}</p>
          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${destinationPhotosMarkup}
            </div>
          </div>
        </section>` : ``}
      </section>
  </form>`
  );
};

export default class EventEditor extends AbstractSmartComponent {
  constructor(event) {
    super();
    this._event = event;
    this._typeOfPoint = event.typeOfPoint;
    this._city = event.city;
    this._offers = event.offers;
    this._destination = event.destination;
    this._submitHandler = null;
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createFormEditorTmpl(this._event, {
      typeOfPoint: this._typeOfPoint,
      city: this._city,
      offers: this._offers,
      destination: this._destination
    });
  }

  setFormSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
    this._submitHandler = handler;
  }

  setFavouritesButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-btn`)
    .addEventListener(`click`, handler);
  }

  recoveryListeners() {
    this.setFormSubmitHandler(this._submitHandler);
    this._subscribeOnEvents();
  }

  _subscribeOnEvents() {
    const element = this.getElement();
    const listOfPoint = element.querySelector(`.event__type-list`);
    const destinationElement = element.querySelector(`.event__input--destination`);

    listOfPoint.addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `LABEL`) {
        return;
      }

      if (!listOfPoint.contains(evt.target)) {
        return;
      }

      const input = evt.target.previousElementSibling;
      this._typeOfPoint = input.value;
      this._offers = getRandomArrayLength(OFFERS[getRandomArrayItem(TYPE_OF_TRIP_POINT)]);
      this.rerender();
    });

    destinationElement.addEventListener(`change`, (evt) => {
      if (this._city === evt.target.value || evt.target.value === ``) {
        return;
      }

      this._city = evt.target.value;
      this._destination = {
        description: `${getRandomArrayLength(DESTINATION.desription, 5).join(` `)}`,
        photos: DESTINATION.photos
      };
      this.rerender();
    });
  }
}
