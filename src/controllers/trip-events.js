import NoPointsComponent from "../components/no-points.js";
import LoadingComponent from "../components/loading.js";
import PointController, {Modes as pointControllerMode, EmptyEvent} from "./point.js";
import SortsComponent, {SortType} from "../components/sorts.js";
import TripDayComponent from "../components/trip-day.js";
import TripDaysComponent from "../components/trip-days.js";
import {groupingEventsInOrderForDays} from "../utils/common.js";
import {render, remove} from "../utils/render.js";
import {HIDDEN_CLASS} from "../constants.js";


const getSortedEvents = (events, sortType = SortType.EVENT) => {
  let sortedEvents = [];
  const showingEvents = events.slice();
  switch (sortType) {

    case SortType.TIME:
      sortedEvents = showingEvents.sort((prev, next) => {
        const prevDuration = prev.timeFrame.start.getTime() - prev.timeFrame.finish.getTime();
        const nextDuration = next.timeFrame.start.getTime() - next.timeFrame.finish.getTime();

        return nextDuration - prevDuration;
      });
      break;

    case SortType.PRICE:
      sortedEvents = showingEvents.sort((prev, next) => next.price - prev.price);
      break;

    case SortType.EVENT:
      sortedEvents = showingEvents.sort((prevEvent, nextEvent) => prevEvent.timeFrame.start.getTime() - nextEvent.timeFrame.start.getTime());
  }
  return sortedEvents;
};

const renderEvent = (event, tripEventsList, onDataChange, onViewChange) => {
  const pointController = new PointController(tripEventsList, onDataChange, onViewChange);
  pointController.render(event, pointControllerMode.DEFAULT);
  return pointController;
};

export default class TripEventsController {
  constructor(container, eventsModel) {
    this._eventsModel = eventsModel;
    this._showedPointControllers = [];
    this._addedNewEventHandlers = [];
    this._container = container;
    this._loadingComponent = new LoadingComponent();
    this._sortsComponent = null;
    this._tripDaysComponent = null;
    this._noPointsComponent = null;
    this._creatingEvent = null;

    this.createEvent = this.createEvent.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._onFilterChange = this._onFilterChange.bind(this);
    this._eventsModel.setFilterChangeHandler(this._onFilterChange);

    this._onSortTypeChange = this._onSortTypeChange.bind(this);

    this._renderLoading();
  }

  render() {
    const events = this._eventsModel.getEvents();

    remove(this._loadingComponent);
    const isNoEvents = events.length === 0;

    if (isNoEvents) {
      this._noPointsComponent = new NoPointsComponent();
      render(this._container, this._noPointsComponent);
      return;
    }

    if (this._noPointsComponent) {
      remove(this._noPointsComponent);
      this._noPointsComponent = null;
    }

    this._tripDaysComponent = new TripDaysComponent();
    this._sortsComponent = new SortsComponent();

    render(this._container, this._sortsComponent);
    this._sortsComponent.setSortTypeChangeHandler(this._onSortTypeChange);

    render(this._container, this._tripDaysComponent);

    const showingEvents = groupingEventsInOrderForDays(getSortedEvents(events));

    this._showedPointControllers = this._renderDay(showingEvents);
  }

  _renderDay(events, isGroupedByDay = true) {
    const tripDaysList = this._tripDaysComponent.getElement();
    tripDaysList.innerHTML = ``;
    let eventControllers = [];

    if (isGroupedByDay) {
      let dayNumber = 1;
      for (const eventsForDay of events) {
        const newDayComponent = new TripDayComponent(eventsForDay, dayNumber);
        const tripEventsList = newDayComponent.getElement().querySelector(`.trip-events__list`);
        eventControllers = eventControllers.concat(eventsForDay.map((event) => renderEvent(event, tripEventsList, this._onDataChange, this._onViewChange)));
        render(tripDaysList, newDayComponent);
        dayNumber++;
      }
    } else {
      const newDayComponent = new TripDayComponent(events);
      const tripEventsList = newDayComponent.getElement().querySelector(`.trip-events__list`);
      eventControllers = events.map((event) => renderEvent(event, tripEventsList, this._onDataChange, this._onViewChange));
      render(tripDaysList, newDayComponent);
    }
    return eventControllers;
  }

  createEvent() {
    if (this._creatingEvent) {
      return;
    }
    this._onViewChange();
    const tripDaysList = this._tripDaysComponent.getElement().querySelector(`.trip-events__list`);
    this._creatingEvent = new PointController(tripDaysList, this._onDataChange, this._onViewChange);
    this._creatingEvent.render(EmptyEvent, pointControllerMode.ADDING);
  }

  _onDataChange(controller, oldData, newData) {
    if (oldData === EmptyEvent) {
      this._creatingEvent = null;
      if (newData === null) {
        this._callHandlers(this._addedNewEventHandlers);
        controller.destroy();
        this._upDateEvent();
      } else {
        this._eventsModel.addEvent(newData);
        this._callHandlers(this._addedNewEventHandlers);
        controller.render(newData, pointControllerMode.DEFAULT);
        this._showedPointControllers = [].concat(controller, this._showedPointControllers);
      }
    } else if (newData === null) {
      this._eventsModel.removeEvent(oldData.id);
      this._upDateEvent();
    } else {
      const isSuccess = this._eventsModel.upDateEvent(oldData.id, newData);
      if (isSuccess) {
        controller.render(newData, pointControllerMode.DEFAULT);
      }
    }
  }

  _onViewChange() {
    this._showedPointControllers.forEach((pointController) => pointController._setDefaultView());
  }

  _onSortTypeChange(sortType) {
    this._removeEvents();
    this._removeCreatedEvent();

    const sortedEvents = getSortedEvents(this._eventsModel.getEvents(), sortType);

    const isGroupedByDay = sortType === SortType.EVENT;
    const showingEvents = isGroupedByDay ? groupingEventsInOrderForDays(sortedEvents) : sortedEvents;

    this._showedPointControllers = this._renderDay(showingEvents, isGroupedByDay);
  }
  _removeCreatedEvent() {
    if (!this._creatingEvent) {
      return;
    }
    this._creatingEvent.destroy();
    this._creatingEvent = null;
    this._callHandlers(this._addedNewEventHandlers);
  }

  _removeEvents() {
    this._showedPointControllers.forEach((controller) => controller.destroy());
    this._showedPointControllers = [];
  }

  _removeDayList() {
    remove(this._sortsComponent);
    remove(this._tripDaysComponent);
    this._removeCreatedEvent();
    this._removeEvents();
  }

  _upDateEvent() {
    this._removeDayList();
    this.render();
  }

  _onFilterChange() {
    this._upDateEvent();
  }

  setAddedNewEventHandler(handler) {
    this._addedNewEventHandlers.push(handler);
  }

  _callHandlers(handelrs) {
    handelrs.forEach((handler) => handler());
  }

  hide() {
    this._container.classList.add(HIDDEN_CLASS);
  }

  show() {
    this._container.classList.remove(HIDDEN_CLASS);
  }
  _renderLoading() {
    render(this._container, this._loadingComponent);
  }
}
