import AbstractComponent from "./abstract-componenet.js";
import {MONTH_NAMES} from "../constants.js";

const createInfoRouteTmpl = (info) => {
  const isShowingInfo = info === false;
  const {startPoint = ``, intermediatePoint = ``, endPoint = ``, dateStart, dateEnd} = info;
  const startMonth = isShowingInfo ? `` : MONTH_NAMES[dateStart.getMonth()];
  const startDay = isShowingInfo ? `` : dateStart.getDate();
  const endtMonth = isShowingInfo ? `` : MONTH_NAMES[dateEnd.getMonth()];
  const endtDay = isShowingInfo ? `` : dateEnd.getDate();

  return `<div class="trip-info__main">
    ${isShowingInfo ? `` : `<h1 class="trip-info__title">${startPoint} &mdash; ${intermediatePoint} &mdash; ${endPoint}</h1>

    <p class="trip-info__dates">${startMonth} ${startDay}&nbsp;&mdash;&nbsp;${endtMonth} ${endtDay}</p>`}
  </div>`;
};

const createPriceTmpl = (price) => {
  const basePrice = price ? price : 0;
  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${basePrice}</span>
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
