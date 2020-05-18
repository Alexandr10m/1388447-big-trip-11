import StatsComponent from "./components/stats.js";
import {MenuItem} from "./components/menu.js";
import {generateEvents} from "./mock/event.js";
import Points from "./models/points";
import TripEventsController from "./controllers/trip-events.js";
import TripInfoController from "./controllers/trip-info.js";
import {render} from "./utils/render.js";

const EVENT_COUNT = 20;

const events = generateEvents(EVENT_COUNT);

const eventsModel = new Points();
eventsModel.setEvents(events);

const tripMainElement = document.querySelector(`.trip-main`);
const bodyContainerElement = document.querySelector(`main .page-body__container`);
const tripEventsElement = document.querySelector(`.trip-events`);

const tripInfoController = new TripInfoController(tripMainElement, eventsModel);
const tripEventsController = new TripEventsController(tripEventsElement, eventsModel);
const statsComponent = new StatsComponent();

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
  }
});

tripInfoController.render();
tripEventsController.render();
render(bodyContainerElement, statsComponent);
