import EventEditorComponent from '../components/form-editor';
import TripDayComponent from '../components/trip-day';
import EventComponent from '../components/event';
import NoPointsComponent from '../components/no-points';
import {groupingEventsInOrderForDays} from '../utils/common';
import {render, replace} from '../utils/render';

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

const renderDay = (events, dayNumber, tripDaysList) => {
  const newDayComponent = new TripDayComponent(events, dayNumber);
  const tripEventsList = newDayComponent.getElement().querySelector(`.trip-events__list`);

  events.forEach((event) => renderEvent(event, tripEventsList));

  render(tripDaysList, newDayComponent);
};

export default class TripController {
  constructor(container) {
    this._container = container;
    this._noPointsComponent = new NoPointsComponent();
  }

  render(allEvents) {
    const tripEventsElement = document.querySelector(`.trip-events`);
    const isNoEvents = allEvents.length === 0;
    if (isNoEvents) {
      render(tripEventsElement, this._noPointsComponent);
      return;
    }

    const sortEvents = groupingEventsInOrderForDays(allEvents);
    render(tripEventsElement, this._container);
    const tripDaysList = this._container.getElement();
    sortEvents.forEach((eventsForday, index) => renderDay(eventsForday, index + 1, tripDaysList));
  }
}
