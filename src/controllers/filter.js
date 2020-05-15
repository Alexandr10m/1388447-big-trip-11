import FiltersComponent from "../components/filters.js";
import {FilterType} from "../constants.js";
import {render, replace, remove} from "../utils/render.js";

export default class Filter {
  constructor(container, onFilterChange) {
    this._container = container;
    this._setFilterChangeinController = onFilterChange;
    this._filterComponent = null;
    this._currentFilter = FilterType.EVERYTHING;
    this._onFilterChange = this._onFilterChange.bind(this);
  }

  render() {
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        type: filterType,
        checked: filterType === this._currentFilter
      };
    });

    const oldFilterComponent = this._filterComponent;

    this._filterComponent = new FiltersComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldFilterComponent) {
      replace(this._filterComponent, oldFilterComponent);
    } else {
      render(this._container, this._filterComponent);
    }
  }

  reset() {
    this._onFilterChange(FilterType.EVERYTHING);
    this.render();
  }

  _onFilterChange(filterType) {
    this._currentFilter = filterType;
    this._setFilterChangeinController(filterType);
  }

  destroy() {
    remove(this._filterComponent);
  }
}
