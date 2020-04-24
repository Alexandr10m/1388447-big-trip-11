import TripInfoComponent from './components/trip-info';
import InfoTitlenComponent from './components/info-route';
import InfoPriceComponent from './components/info-price';
import MenuComponent from './components/menu';
import FiltersComponent from './components/filters';
import SortsComponent from './components/sorts';
import TripDaysComponent from './components/trip-days';
import {render, RenderPosition} from './utils/render';
import {generateEvents} from './mock/event';
import TripController from './controllers/trip-days';

const EVENT_COUNT = 20;

const renderTripInfo = () => {
  const tripInfoContainer = new TripInfoComponent();
  render(tripMainElement, tripInfoContainer, RenderPosition.AFTERBEGIN);
  render(tripInfoContainer.getElement(), new InfoTitlenComponent());
  render(tripInfoContainer.getElement(), new InfoPriceComponent());
};

const renderControls = () => {
  const tripControlsElemnt = tripMainElement.querySelector(`.trip-main__trip-controls`);
  render(tripControlsElemnt.children[0], new MenuComponent(), RenderPosition.AFTEREND);
  render(tripControlsElemnt, new FiltersComponent());
};

const renderSorts = () => {
  render(tripEventsElement, new SortsComponent());
};

const renderTripEvents = (allEvents) =>{
  const tripDaysComponent = new TripDaysComponent();
  const tripDaysController = new TripController(tripDaysComponent);
  tripDaysController.render(allEvents);
};

const events = generateEvents(EVENT_COUNT);
const tripMainElement = document.querySelector(`.trip-main`);

renderTripInfo();
renderControls();

const tripEventsElement = document.querySelector(`.trip-events`);

events.sort((prevEvent, nextEvent) => prevEvent.timeFrame.start.getTime() - nextEvent.timeFrame.start.getTime());
renderSorts();
renderTripEvents(events);
