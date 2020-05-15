import AbstractComponent from "./abstract-componenet.js";
import {MONTH_NAMES} from "../constants.js";

const createInfoRouteTmpl = (info) => {
  const {startPoint, intermediatePoint, endPoint, dateStart, dateEnd} = info;
  const startMonth = MONTH_NAMES[dateStart.getMonth()];
  const startDay = dateStart.getDate();
  const endtMonth = MONTH_NAMES[dateEnd.getMonth()];
  const endtDay = dateEnd.getDate();

  return `<div class="trip-info__main">
    <h1 class="trip-info__title">${startPoint} &mdash; ${intermediatePoint} &mdash; ${endPoint}</h1>

    <p class="trip-info__dates">${startMonth} ${startDay}&nbsp;&mdash;&nbsp;${endtMonth} ${endtDay}</p>
  </div>`;
};

const createPriceTmpl = (price) => {
  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
  </p>`;
};

const createTripInfoTmpl = (info) => {
  const infoRouteMarkup = createInfoRouteTmpl(info);
  const infoPriceMarkup = createPriceTmpl(info.price);
  return (
    `<section class="trip-main__trip-info  trip-info">
      ${infoRouteMarkup}
      ${infoPriceMarkup}
    </section>`
  );
};

export default class TripInfo extends AbstractComponent {
  constructor(info) {
    super();
    this._info = info;
  }

  getTemplate() {
    return createTripInfoTmpl(this._info);
  }
}
