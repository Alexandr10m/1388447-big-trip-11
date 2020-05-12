import AbstractComponent from "./abstract-componenet.js";
import {firstWordInUpper} from "../utils/common.js";

const FILTER_ID_PREFIX = `filter-`;

const getFilterNameById = (id) => {
  return id.substring(FILTER_ID_PREFIX.length);
};

const createFilterMarkup = (type, isChecked) => {
  return (
    `<div class="trip-filters__filter">
      <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${isChecked ? `checked` : ``}>
      <label class="trip-filters__filter-label" for="filter-${type}">${firstWordInUpper(type)}</label>
    </div>`
  );
};

const createFiltersTmpl = (filters) => {
  const filtersMarkup = filters.map((filter) => createFilterMarkup(filter.type, filter.checked)).join(`\n`);
  return `<form class="trip-filters" action="#" method="get">
    ${filtersMarkup}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};

export default class Filters extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFiltersTmpl(this._filters);
  }

  setFilterChangeHandler(handler) {
    const element = this.getElement();
    element.addEventListener(`change`, (evt) => {
      const filterName = getFilterNameById(evt.target.id);
      handler(filterName);
    });
  }
}
