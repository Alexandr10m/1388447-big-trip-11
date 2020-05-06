import NoPointsComponent from "../components/no-points.js";
import PointController from "./point.js";
import SortsComponent, {SortType} from "../components/sorts.js";
import TripDayComponent from "../components/trip-day.js";
import TripDaysComponent from "../components/trip-days.js";
import {groupingEventsInOrderForDays} from "../utils/common.js";
import {render} from "../utils/render.js";


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
  pointController.render(event);
  return pointController;
};

export default class TripEventsController {
  constructor(container) {
    this._events = [];
    this._showedPointControllers = [];
    this._container = container;
    this._sortsComponent = new SortsComponent();
    this._tripDaysComponent = new TripDaysComponent();
    this._noPointsComponent = new NoPointsComponent();
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sortsComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(events) {
    this._events = events;

    const isNoEvents = events.length === 0;

    if (isNoEvents) {
      render(this._container, this._noPointsComponent);
      return;
    }

    render(this._container, this._sortsComponent);
    render(this._container, this._tripDaysComponent);

    const showingEvents = groupingEventsInOrderForDays(getSortedEvents(this._events));

    this._showedPointControllers = this._renderDay(showingEvents);
  }

  _renderDay(events) {
    const isGroupedForDays = events[0].length > 0;
    const tripDaysList = this._tripDaysComponent.getElement();
    let eventControllers = [];

    if (isGroupedForDays) {
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

  _onDataChange(controller, oldData, newData) {
    const index = this._events.findIndex((it) => it === oldData);
    if (index === -1) {
      return;
    }

    this._events = [].concat(this._events.slice(0, index), newData, this._events.slice(index + 1));
    controller.render(this._events[index]);
  }

  _onViewChange() {
    this._showedPointControllers.forEach((pointController) => pointController._setDefaultView());
  }

  _onSortTypeChange(sortType) {
    const sortedEvents = getSortedEvents(this._events, sortType);

    const isGroupedByDay = sortType === SortType.EVENT;
    const showingEvents = isGroupedByDay ? groupingEventsInOrderForDays(sortedEvents) : sortedEvents;

    this._tripDaysComponent.getElement().innerHTML = ``;

    this._showedPointControllers = this._renderDay(showingEvents);
  }
}
