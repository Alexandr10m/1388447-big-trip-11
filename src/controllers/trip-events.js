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

const renderEvent = (event, tripEventsList, onDataChange) => {
  const pointController = new PointController(tripEventsList, onDataChange);
  pointController.render(event);
  return pointController;
};

const renderDay = (events, dayNumber, tripDaysList, onDataChange, isGroupedByDay = true) => {
  const newDayComponent = new TripDayComponent(events, dayNumber, isGroupedByDay);

  const tripEventsList = newDayComponent.getElement().querySelector(`.trip-events__list`);

  if (isGroupedByDay) {
    events.forEach((event) => renderEvent(event, tripEventsList, onDataChange));
  } else {
    renderEvent(events, tripEventsList, onDataChange);
  }

  render(tripDaysList, newDayComponent);
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

    const tripDaysList = this._tripDaysComponent.getElement();
    showingEvents.forEach((eventsForDays, index) => renderDay(eventsForDays, index + 1, tripDaysList, this._onDataChange));
  }

  _onDataChange(oldEvent, newEvent) {
    const index = this._events.findIndex((event) => event === oldEvent);

    if (index === -1) {
      return;
    }

    this.events = [].concat(this._events.slice(0, index), newEvent, this._events.slice(index));
    this._showedPointControllers[index].render(this._events[index]);
  }

  _onSortTypeChange(sortType) {
    const sortedEvents = getSortedEvents(this._events, sortType);

    const isGroupedByDay = sortType === SortType.EVENT;
    const showingEvents = isGroupedByDay ? groupingEventsInOrderForDays(sortedEvents) : sortedEvents;

    this._tripDaysComponent.getElement().innerHTML = ``;

    const tripDaysList = this._tripDaysComponent.getElement();
    showingEvents.forEach((events, index) => renderDay(events, index + 1, tripDaysList, this._onDataChange, isGroupedByDay));
  }
}
