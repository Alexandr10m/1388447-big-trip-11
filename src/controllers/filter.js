import FiltersComponent from "../components/filters.js";
import {FilterType} from "../constants.js";
import {render} from "../utils/render.js";

export default class Filter {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;
    this._filterComponent = null;
    this._currentFilter = FilterType.EVERYTHING;
  }

  render() {
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        type: filterType,
        checked: filterType === this._currentFilter
      };
    });

    this._filterComponent = new FiltersComponent(filters);

    this._filterComponent.setFilterChangeHandler((filterType) => {
      this._currentFilter = filterType;
      this._eventsModel.setFilter(this._currentFilter);
    });

    render(this._container, this._filterComponent);
  }
}
