import TripInfoController from "./controllers/trip-info.js";
import {generateEvents} from "./mock/event.js";
import Points from "./models/points";
import TripEventsController from "./controllers/trip-events.js";
// import {MenuOption} from "./constants.js";


const EVENT_COUNT = 20;

const events = generateEvents(EVENT_COUNT);

const eventsModel = new Points();
eventsModel.setEvents(events);

const tripMainElement = document.querySelector(`.trip-main`);
const tripEventsElement = document.querySelector(`.trip-events`);

// menuComponent.setOnChange((MenuOption) => {
//   switch (MenuOption) {
//     case MenuOption.TABLE:
//       menuComponent.setActiveItem(MenuOption.T)
//   }
// });

const tripInfoController = new TripInfoController(tripMainElement, eventsModel);
const tripEventsController = new TripEventsController(tripEventsElement, eventsModel);

tripEventsController.setAddedNewEventHandler(tripInfoController.enableButtonNewEvent);
tripInfoController.setClickNewEventButtonHandler(tripEventsController.createEvent);

tripInfoController.render();
tripEventsController.render();

