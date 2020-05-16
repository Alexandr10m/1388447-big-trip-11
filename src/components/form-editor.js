import {TYPE_OF_TRIP_POINT} from "../constants.js";
import {CITYES, OFFERS, getRandomArrayLength, getRandomArrayItem, DESTINATION} from "../mock/event.js";
import {formatFullTime, firstWordInUpper, isActiveEvent} from "../utils/common.js";
import AbstractSmartComponent from "./abstract-smart-component.js";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const ButtonOption = {
  CANCEL: `Cancel`,
  DELETE: `Delete`
};

const parseDate = (dateString) => {
  const date = dateString.split(`/`);
  return new Date(`${date[1]} ${date[0]} ${date[2]} ${date[3]}`);
};

const checkCity = (str) => {
  if (str.trim().length === 0) {
    return false;
  }
  return CITYES.some((city) => city.toLowerCase() === str.trim().toLowerCase());
};

const checkPrice = (str) => {
  if (str.trim().length === 0) {
    return false;
  }
  const number = Number(str.trim());
  return !Number.isNaN(number) ? true : false;
};

const parseFormData = (formData) => {
  const typeOfPoint = formData.get(`event-type`);
  const offers = [];

  for (const it of OFFERS[typeOfPoint]) {
    if (!formData.get(`event-offer-${it.name}`)) {
      continue;
    }
    offers.push(it);
  }

  return {
    typeOfPoint,
    city: formData.get(`event-destination`),
    offers,
    destination: null,
    price: Number(formData.get(`event-price`)),
    timeFrame: {
      start: parseDate(formData.get(`event-start-time`)),
      finish: parseDate(formData.get(`event-end-time`))
    },
    isFavourite: formData.get(`event-favorite`) ? true : false
  };
};

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
  const {timeFrame, isFavourite} = event;
  const {typeOfPoint, city, offers, destination, price} = option;
  const isEmptyEvent = !timeFrame;
  const isCity = !!city;
  const isDistination = !!destination;
  const index = 1;
  const date = new Date();
  const timeStart = isEmptyEvent ? formatFullTime(date) : formatFullTime(timeFrame.start);
  const timeEnd = isEmptyEvent ? formatFullTime(date) : formatFullTime(timeFrame.finish);
  const optionsOfTypeEventMarkup = createListEventTypeTmpl(TYPE_OF_TRIP_POINT, typeOfPoint);
  const optionsOfCityMarkup = createListOfCityesTmpl(CITYES);
  const preposition = isActiveEvent(typeOfPoint) ? `in` : `to`;
  const buttonOption = isEmptyEvent ? ButtonOption.CANCEL : ButtonOption.DELETE;

  const isOffersShowing = !!offers.length;
  const offersMarkup = isOffersShowing ? createOffersTmpl(offers) : ``;

  const destinationPhotosMarkup = isCity && isDistination ? createDestinationPhotoTmpl(destination.photos) : ``;
  const isDistinationShowing = isCity && isDistination ? !!destination.description : false;

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
          <input class="event__input  event__input--time" id="event-start-time-${index}" type="text" name="event-start-time" value="${timeStart}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-${index}">
            ${firstWordInUpper(preposition)}
          </label>
          <input class="event__input  event__input--time" id="event-end-time-${index}" type="text" name="event-end-time" value="${timeEnd}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-${index}">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-${index}" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">${buttonOption}</button>
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
    this._price = event.price;
    this._offers = event.offers;
    this._destination = event.destination;
    this._timeFrame = event.timeFrame;
    this._flatpickrs = [];
    this._submitHandler = null;
    this._favouriteHandler = null;
    this._deleteHandler = null;
    this._closeHandler = null;

    this._applyFlatpickr();
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createFormEditorTmpl(this._event, {
      typeOfPoint: this._typeOfPoint,
      city: this._city,
      offers: this._offers,
      destination: this._destination,
      price: this._price,
    });
  }

  setFormSubmitHandler(handler) {
    const element = this.getElement();
    this._submitHandler = handler;
    element.addEventListener(`submit`, (evt) => {
      evt.preventDefault();

      const destinationElement = element.querySelector(`.event__input--destination`);
      const priceElement = element.querySelector(`.event__input--price`);

      if (destinationElement.value === `` || priceElement === ``) {
        destinationElement.setCustomValidity(`Введите название города из списка`);
        priceElement.setCustomValidity(`Введите число`);
        return;
      }

      this._submitHandler();
    });

  }

  setFavouritesButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-btn`)
    .addEventListener(`change`, handler);
    this._favouriteHandler = handler;
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`)
      .addEventListener(`click`, handler);
    this._deleteHandler = handler;
  }

  setCloseButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
    this._closeHandler = handler;
  }

  rerender() {
    super.rerender();
    this._applyFlatpickr();
  }

  getData() {
    const form = this.getElement();
    const formData = new FormData(form);
    return parseFormData(formData);
  }

  removeElement() {
    if (this._flatpickrs) {
      this._flatpickrs.forEach((it) => it.destroy());
      this._flatpickrs = [];
    }
    super.removeElement();
  }

  _applyFlatpickr() {
    if (this._flatpickrs.length) {
      this._flatpickrs.forEach((it) => it.destroy());
      this._flatpickrs = [];
    }

    if (this._typeOfPoint) {
      const startDateElement = this.getElement().querySelector(`#event-start-time-1`);
      const startTime = flatpickr(startDateElement, {
        dateFormat: `d/m/y/ H:i`,
        allowInput: true,
      });
      this._flatpickrs.push(startTime);

      const endDateElement = this.getElement().querySelector(`#event-end-time-1`);
      const endTime = flatpickr(endDateElement, {
        dateFormat: `d/m/y/ H:i`,
        allowInput: true,
      });
      this._flatpickrs.push(endTime);
    }
  }

  reset() {
    this._typeOfPoint = this._event.typeOfPoint;
    this._city = this._event.city;
    this._offers = this._event.offers;
    this._destination = this._event.destination;

    this.rerender();
  }

  recoveryListeners() {
    this.setFormSubmitHandler(this._submitHandler);
    this.setFavouritesButtonClickHandler(this._favouriteHandler);
    this.setDeleteButtonClickHandler(this._deleteHandler);
    this.setCloseButtonClickHandler(this._closeHandler);
    this._subscribeOnEvents();
  }

  _subscribeOnEvents() {
    const element = this.getElement();
    const listOfPoint = element.querySelector(`.event__type-list`);
    const destinationElement = element.querySelector(`.event__input--destination`);
    const priceElement = element.querySelector(`.event__input--price`);
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

    destinationElement.addEventListener(`input`, (evt) => {
      if (!checkCity(evt.target.value)) {
        evt.target.setCustomValidity(`Введите название города из списка`);
        return;
      } else if (this._city === evt.target.value || evt.target.value === ``) {
        return;
      } else {
        this._city = evt.target.value;
        this._destination = {
          description: getRandomArrayLength(DESTINATION.desription, 5),
          photos: DESTINATION.photos
        };
        this.rerender();
      }
    });

    priceElement.addEventListener(`change`, (evt) => {
      if (!checkPrice(evt.target.value)) {
        evt.target.setCustomValidity(`Введите число`);
      } else if (this._price === evt.target.value && evt.target.value === ``) {
        return;
      } else {
        this._price = evt.target.value;
        this.rerender();
      }
    });
  }
}
