import {TYPE_OF_TRIP_POINT} from '../constants';
import {CITYES} from '../mock/event';
import {formatFullTime} from '../utils';

const getDestinationPhotoTmpl = (photos) => {
  const imgList = photos.map((photo) => `<img class="event__photo" src="${photo}" alt="Event photo">`).join(``);
  return imgList;
};
const getListOfCityesTmpl = (cityes) => {
  const listOfCityes = cityes.map((city) => `<option value="${city}"></option>`);
  return listOfCityes;
};
const getListEventsTypeTmpl = (eventsTypes, checked) => {
  const allEvents = eventsTypes.map((event, index) => {
    const isChecked = eventsTypes[index] === checked ? `checked` : ``;
    return (
      `<div class="event__type-item">
        <input id="event-type-${event.toLowerCase()}-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${event.toLowerCase()}" ${isChecked}>
        <label class="event__type-label  event__type-label--${event.toLowerCase()}" for="event-type-${event.toLowerCase()}-indexDay">${event}</label>
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
const getOffersTmpl = (offers) => {
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
const getFormEditorTmpl = ({typeOfPoint, city = ``, price = ``, offers, timeFrame, destination: {description: distinationDescription, photos: destinationPhotos}}) => {
  const index = 1;
  const timeStart = formatFullTime(timeFrame.start);
  const timeEnd = formatFullTime(timeFrame.finish);
  const optionsOfTypeEventMarkup = getListEventsTypeTmpl(TYPE_OF_TRIP_POINT, typeOfPoint);
  const optionsOfCityMarkup = getListOfCityesTmpl(CITYES);

  const isActiveEvent = typeOfPoint === `Sightseeing` || typeOfPoint === `Check-in` || typeOfPoint === `Restaurant`;
  const preposition = isActiveEvent ? `In` : `To`;

  const isOffersShowing = !!offers.length;
  const offersMarkup = isOffersShowing ? getOffersTmpl(offers) : ``;

  const destinationPhotosMarkup = getDestinationPhotoTmpl(destinationPhotos);
  const isDistinationShowing = !!distinationDescription;

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-${index}">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${typeOfPoint.toLowerCase()}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${index}" type="checkbox">

          <div class="event__type-list">
            ${optionsOfTypeEventMarkup}
          </div>
        </div>
        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-${index}">
            ${typeOfPoint} ${preposition.toLowerCase()}
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
            ${preposition}
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
          <p class="event__destination-description">${distinationDescription}</p>
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
export {getFormEditorTmpl};
