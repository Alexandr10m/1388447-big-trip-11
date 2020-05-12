import TripInfoComponent from "./components/trip-info.js";
import InfoTitlenComponent from "./components/info-route.js";
import InfoPriceComponent from "./components/info-price.js";
import MenuComponent from "./components/menu.js";
import FilterController from "./controllers/filter.js";
import {render, RenderPosition} from "./utils/render.js";
import {generateEvents} from "./mock/event.js";
import Points from "./models/points";
import TripEventsController from "./controllers/trip-events.js";


const EVENT_COUNT = 20;

const renderTripInfo = () => {
  const tripInfoContainer = new TripInfoComponent();
  render(tripMainElement, tripInfoContainer, RenderPosition.AFTERBEGIN);
  render(tripInfoContainer.getElement(), new InfoTitlenComponent());
  render(tripInfoContainer.getElement(), new InfoPriceComponent());
};

const renderControls = (model) => {
  const tripControlsElemnt = tripMainElement.querySelector(`.trip-main__trip-controls`);
  render(tripControlsElemnt.children[0], new MenuComponent(), RenderPosition.AFTEREND);
  const filterController = new FilterController(tripControlsElemnt, model);
  filterController.render();
};

const renderTripEvents = (model) => {
  const tripEventsController = new TripEventsController(tripEventsElement, model);
  tripEventsController.render();
};

const events = generateEvents(EVENT_COUNT);
const eventsModel = new Points();
eventsModel.setEvents(events);

const tripMainElement = document.querySelector(`.trip-main`);
const tripEventsElement = document.querySelector(`.trip-events`);

renderTripInfo();
renderControls(eventsModel);
renderTripEvents(eventsModel);
