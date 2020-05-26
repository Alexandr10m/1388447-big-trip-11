import AbstractComponent from "./abstract-componenet.js";
import {SORT_OPTIONS} from "../constants.js";

const SortType = {
  EVENT: `data-event`,
  TIME: `data-time`,
  PRICE: `data-price`
};

const createSortOptionMarkup = (name, isChecked) => {
  return (
    `<div class="trip-sort__item  trip-sort__item--${name.toLowerCase()}">
      <input id="sort-${name.toLowerCase()}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${name.toLowerCase()}" ${isChecked ? `checked=""` : ``}>
      <label data-sort-type="${SortType[name.toUpperCase()]}" class="trip-sort__btn" for="sort-${name.toLowerCase()}">${name}</label>
    </div>`
  );
};

const createSortTmpl = () => {
  const sortOptionMarkup = SORT_OPTIONS.map((option, index) => createSortOptionMarkup(option, index === 0)).join(``);

  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  <span class="trip-sort__item  trip-sort__item--day">Day</span>

  ${sortOptionMarkup}

  <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
</form>`;
};


export default class Sorts extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = SortType.EVENT;
  }
  getTemplate() {
    return createSortTmpl();
  }

  getSortType() {
    return this._currentSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {

      if (evt.target.tagName !== `LABEL`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;
      handler(this._currentSortType);
    });
  }
}

export {SortType};
