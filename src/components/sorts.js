import AbstractComponent from "./abstract-componenet.js";

const SortType = {
  EVENT: `data-event`,
  TIME: `data-time`,
  PRICE: `data-price`
};

// не понимаю почему не работает input radio (checked)
// Как мне орисовывать разметку сначала с columnName, а когда сортировка, то без него
const createSortTmpl = () => {
  const columnName = `Day`;
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  <span class="trip-sort__item  trip-sort__item--day">${columnName}</span>

  <div class="trip-sort__item  trip-sort__item--event">
    <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" checked="">
    <label data-sort-type="${SortType.EVENT}" class="trip-sort__btn" for="sort-event">Event</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--time">
    <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
    <label data-sort-type="${SortType.TIME}" class="trip-sort__btn" for="sort-time">
      Time
      <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
        <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"></path>
      </svg>
    </label>
  </div>

  <div class="trip-sort__item  trip-sort__item--price">
    <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
    <label data-sort-type="${SortType.PRICE}" class="trip-sort__btn" for="sort-price">
      Price
      <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
        <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"></path>
      </svg>
    </label>
  </div>

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
      evt.preventDefault();

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
