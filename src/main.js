import API from "./api.js";
import Destinations from "./models/destinations.js";
import Offers from "./models/offers.js";
import StatsComponent from "./components/stats.js";
import {MenuItem} from "./components/menu.js";
import Points from "./models/points";
import TripEventsController from "./controllers/trip-events.js";
import TripInfoController from "./controllers/trip-info.js";
import {render} from "./utils/render.js";

const AUTHORIZATION = `Basic ret3443he4`;
const END_POINT = `https://11.ecmascript.pages.academy/big-trip/`;

const api = new API(END_POINT, AUTHORIZATION);

const eventsModel = new Points();
const destinationsModel = new Destinations();
const offersModel = new Offers();

const tripMainElement = document.querySelector(`.trip-main`);
const bodyContainerElement = document.querySelector(`main .page-body__container`);
const tripEventsElement = document.querySelector(`.trip-events`);

const tripInfoController = new TripInfoController(tripMainElement, eventsModel);
const tripEventsController = new TripEventsController(tripEventsElement, eventsModel, destinationsModel, offersModel, api);
const statsComponent = new StatsComponent(eventsModel);

tripEventsController.setAddedNewEventHandler(tripInfoController.enableButtonNewEvent);
tripInfoController.setClickNewEventButtonHandler(tripEventsController.createEvent);
tripInfoController.setOnClickMenuItem((menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      statsComponent.hide();
      tripEventsController.show();
      break;

    case MenuItem.STATS:
      tripEventsController.hide();
      statsComponent.show();
      break;
  }
});

api.getOffers()
.then((offers) => offersModel.setOffers(offers))
.then(() => api.getDestinations())
.then((destinations) => destinationsModel.setDestinations(destinations))
.then(() => api.getEvents())
.then((events) => {
  eventsModel.setEvents(events);
  render(bodyContainerElement, statsComponent);
  statsComponent.hide();
  tripEventsController.render();
})
.catch(() => {
  // renderError();
  return [];
});
