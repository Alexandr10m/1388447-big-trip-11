import TripInfoComponent from "../components/trip-info.js";
import FilterController from "../controllers/filter.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {getTripInfo} from "../utils/common.js";
import MenuComponent from "../components/menu.js";

export default class TripInfo {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;
    this._clickNewEventHandlers = [];
    this._buttonNewEventElement = null;
    this._tripInfoComponent = null;
    this._filterController = null;
    this._menuComponenet = new MenuComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._eventsModel.setDataChangeHandler(this._onDataChange);

    this._onFilterChange = this._onFilterChange.bind(this);
    this.enableButtonNewEvent = this.enableButtonNewEvent.bind(this);
  }

  render() {
    const allEvents = this._eventsModel.getAllEvents();
    const tripConrolsElement = this._container.querySelector(`.trip-main__trip-controls`);

    const tripInfoItem = getTripInfo(allEvents);
    this._tripInfoComponent = new TripInfoComponent(tripInfoItem);

    render(this._container, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
    render(tripConrolsElement, this._menuComponenet);

    if (!this._filterController) {
      this._filterController = new FilterController(tripConrolsElement, this._onFilterChange);
      this._filterController.render();
    } else {
      this._filterController.render();
    }

    this._buttonNewEventElement = this._container.querySelector(`.trip-main__event-add-btn`);
    this._buttonNewEventElement.addEventListener(`click`, () => {
      this._buttonNewEventElement.disabled = true;
      this._filterController.reset();
      this._callHandlers(this._clickNewEventHandlers);
    });
  }

  _onDataChange() {
    this._upDateTripInfo();
  }

  _onFilterChange(filterType) {
    this._eventsModel.setFilter(filterType);
  }

  _remove() {
    remove(this._tripInfoComponent);
    this._filterController.destroy();
    this._filterController = null;
  }

  _upDateTripInfo() {
    this._remove();
    this.render();
  }

  resetFilter() {
    this._filterController.reset();
  }

  enableButtonNewEvent() {
    this._buttonNewEventElement.disabled = false;
  }

  setClickNewEventButtonHandler(handler) {
    this._clickNewEventHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
