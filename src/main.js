import TripInfoComponent from './components/trip-info';
import InfoTitlenComponent from './components/info-route';
import InfoPriceComponent from './components/info-price';
import MenuComponent from './components/menu';
import FiltersComponent from './components/filters';
import EventEditorComponent from './components/form-editor';
import SortsComponent from './components/sorts';
import TripDaysComponent from './components/trip-days';
import TripDayComponent from './components/trip-day';
import EventComponent from './components/event';
import {render, RenderPosition, groupingEventsInOrderForDays} from './utils';
import {generateEvents} from './mock/event';

const EVENT_COUNT = 20;

const renderTripInfo = () => {
  const tripInfoContainer = new TripInfoComponent();
  render(tripMainElement, tripInfoContainer.getElement(), RenderPosition.AFTERBEGIN);
  render(tripInfoContainer.getElement(), new InfoTitlenComponent().getElement());
  render(tripInfoContainer.getElement(), new InfoPriceComponent().getElement());
};
const renderControls = () => {
  const tripControlsElemnt = tripMainElement.querySelector(`.trip-main__trip-controls`);
  render(tripControlsElemnt.children[0], new MenuComponent().getElement(), RenderPosition.AFTEREND);
  render(tripControlsElemnt, new FiltersComponent().getElement());
};
const renderSorts = () => {
  render(tripEventsElement, new SortsComponent().getElement());
};
const renderEvent = (event, tripEventsList) => {
  const replaceEventToEditor = () => {
    tripEventsList.replaceChild(eventEditorComponent.getElement(), eventComponent.getElement());
  };
  const replaceEditorToEvent = () => {
    tripEventsList.replaceChild(eventComponent.getElement(), eventEditorComponent.getElement());
  };

  const eventComponent = new EventComponent(event);
  const editButton = eventComponent.getElement().querySelector(`.event__rollup-btn`);
  editButton.addEventListener(`click`, () => {
    replaceEventToEditor();
  });

  const eventEditorComponent = new EventEditorComponent(event);
  eventEditorComponent.getElement().addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceEditorToEvent();
  });
  render(tripEventsList, eventComponent.getElement());
};
const renderDay = (events, dayNumber, tripDaysList) => {
  const newDayComponent = new TripDayComponent(events, dayNumber);
  const tripEventsList = newDayComponent.getElement().querySelector(`.trip-events__list`);

  events.forEach((event) => renderEvent(event, tripEventsList));

  render(tripDaysList, newDayComponent.getElement());
};
const renderTripEvents = (allEvents) => {
  const sortEvents = groupingEventsInOrderForDays(allEvents);

  const tripDaysComponent = new TripDaysComponent();
  render(tripEventsElement, tripDaysComponent.getElement());

  const tripDaysList = tripDaysComponent.getElement();
  sortEvents.forEach((eventsForday, index) => renderDay(eventsForday, index + 1, tripDaysList));
};

const events = generateEvents(EVENT_COUNT);
const tripMainElement = document.querySelector(`.trip-main`);

renderTripInfo();
renderControls();

const tripEventsElement = document.querySelector(`.trip-events`);

events.sort((prevEvent, nextEvent) => prevEvent.timeFrame.start.getTime() - nextEvent.timeFrame.start.getTime());
renderSorts();
renderTripEvents(events);
