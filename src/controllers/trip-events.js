import EventEditorComponent from "../components/form-editor.js";
import TripDayComponent from "../components/trip-day.js";
import EventComponent from "../components/event.js";
import NoPointsComponent from "../components/no-points.js";
import {groupingEventsInOrderForDays} from "../utils/common.js";
import {render, replace} from "../utils/render.js";
import SortsComponent, {SortType} from "../components/sorts.js";
import TripDaysComponent from "../components/trip-days.js";

const getSortedEvents = (events, sortType) => {
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

const renderEvent = (event, tripEventsList) => {
  const replaceEventToEditor = () => {
    replace(eventEditorComponent, eventComponent);
  };
  const replaceEditorToEvent = () => {
    replace(eventComponent, eventEditorComponent);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      replaceEditorToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const eventComponent = new EventComponent(event);
  eventComponent.setEditButtonClickHandler(() => {
    replaceEventToEditor();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const eventEditorComponent = new EventEditorComponent(event);
  eventEditorComponent.setFormSubmitHandler((evt) => {
    evt.preventDefault();
    replaceEditorToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });
  render(tripEventsList, eventComponent);
};

const renderDay = (events, dayNumber, tripDaysList, isGroupedByDay = true) => {
  const newDayComponent = new TripDayComponent(events, dayNumber, isGroupedByDay);
  const tripEventsList = newDayComponent.getElement().querySelector(`.trip-events__list`);

  if (isGroupedByDay) {
    events.forEach((event) => renderEvent(event, tripEventsList));
  } else {
    renderEvent(events, tripEventsList);
  }

  render(tripDaysList, newDayComponent);
};

const renderDays = (allEvents, tripDayComponent, sortType = SortType.EVENT) => {
  const sortedEvents = getSortedEvents(allEvents, sortType);
  const isGroupedByDay = sortType === SortType.EVENT;
  const showingEvents = isGroupedByDay ? groupingEventsInOrderForDays(sortedEvents) : sortedEvents;
  tripDayComponent.getElement().innerHTML = ``;
  const tripDaysList = tripDayComponent.getElement();
  showingEvents.forEach((events, index) => renderDay(events, index + 1, tripDaysList, isGroupedByDay));
};

export default class TripEventsController {
  constructor(container) {
    this._container = container;
    this._sortsComponent = new SortsComponent();
    this._tripDaysComponent = new TripDaysComponent();
    this._noPointsComponent = new NoPointsComponent();
  }

  render(allEvents) {
    const isNoEvents = allEvents.length === 0;

    if (isNoEvents) {
      render(this._container, this._noPointsComponent);
      return;
    }

    render(this._container, this._sortsComponent);
    render(this._container, this._tripDaysComponent);

    renderDays(allEvents, this._tripDaysComponent);

    this._sortsComponent.setSortTypeChangeHandler((sortType) => {
      renderDays(allEvents, this._tripDaysComponent, sortType);
    });
  }

}
