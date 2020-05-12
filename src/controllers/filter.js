import FiltersComponent from "../components/filters.js";
import {FilterType} from "../constants.js";
import {render, replace} from "../utils/render.js";

export default class Filter {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;
    this._filterComponent = null;
    this._currentFilter = FilterType.EVERYTHING;
    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._eventsModel.setDataChangeHandler(this._onDataChange);
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

  _onDataChange() {
    this.render();
  }

  _onFilterChange(filterType) {
    this._currentFilter = filterType;
    this._eventsModel.setFilter(this._currentFilter);
  }
}
