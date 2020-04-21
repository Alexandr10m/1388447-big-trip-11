import TripInfoSectionComponent from './components/section';
import TripInfonComponent from './components/trip-info';
import PriceComponent from './components/price';
import MenuComponent from './components/menu';
import FiltersComponent from './components/filters';
import EventEditComponenet from './components/form-editor';
import SortsComponent from './components/sorts';
import EventsComponent from './components/events';
import {render, RenderPosition, groupingEventsInOrderForDays} from './utils';
import {generateEvents} from './mock/event';

const EVENT_COUNT = 20;

const renderTripInfo = () => {
  const tripInfoContainer = new TripInfoSectionComponent();
  render(tripMainElement, tripInfoContainer.getElement(), RenderPosition.AFTERBEGIN);
  render(tripInfoContainer.getElement(), new TripInfonComponent().getElement());
  render(tripInfoContainer.getElement(), new PriceComponent().getElement());
};
const renderControls = () => {
  const tripControlsElemnt = tripMainElement.querySelector(`.trip-main__trip-controls`);
  render(tripControlsElemnt.children[0], new MenuComponent().getElement(), RenderPosition.AFTEREND);
  render(tripControlsElemnt, new FiltersComponent().getElement());
};
const renderFormEdit = () => {
  render(tripEventsElement, new EventEditComponenet(events[0]).getElement());
};
const renderSorts = () => {
  render(tripEventsElement, new SortsComponent().getElement());
};
const renderEvents = (allEvents) => {
  render(tripEventsElement, new EventsComponent(groupingEventsInOrderForDays(allEvents)).getElement());
};

const events = generateEvents(EVENT_COUNT);
const tripMainElement = document.querySelector(`.trip-main`);

renderTripInfo();
renderControls();

const tripEventsElement = document.querySelector(`.trip-events`);

events.sort((prevEvent, nextEvent) => prevEvent.timeFrame.start.getTime() - nextEvent.timeFrame.start.getTime());
renderFormEdit();
renderSorts();
renderEvents(events);
