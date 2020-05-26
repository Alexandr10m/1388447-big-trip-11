import NoPointsComponent from "../components/no-points.js";
import LoadingComponent from "../components/loading.js";
import PointController, {Modes as pointControllerMode, EmptyEvent} from "./point.js";
import SortsComponent, {SortType} from "../components/sorts.js";
import TripDayComponent from "../components/trip-day.js";
import TripDaysComponent from "../components/trip-days.js";
import {groupingEventsInOrderForDays} from "../utils/common.js";
import {render, remove} from "../utils/render.js";
import {HIDDEN_CLASS} from "../constants.js";


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

export default class TripEventsController {
  constructor(container, eventsModel, destinationsModel, offersModel, api) {
    this._eventsModel = eventsModel;
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;
    this._api = api;
    this._showedPointControllers = [];
    this._addedNewEventHandlers = [];
    this._container = container;
    this._loadingComponent = new LoadingComponent();
    this._sortsComponent = null;
    this._tripDaysComponent = null;
    this._noPointsComponent = null;
    this._creatingEvent = null;

    this.createEvent = this.createEvent.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._onFilterChange = this._onFilterChange.bind(this);
    this._eventsModel.setFilterChangeHandler(this._onFilterChange);

    this._onSortTypeChange = this._onSortTypeChange.bind(this);

    this._renderLoading();
  }

  render() {
    remove(this._loadingComponent);

    const events = this._eventsModel.getEvents();
    const isNoEvents = events.length === 0;

    if (isNoEvents) {
      this._noPointsComponent = new NoPointsComponent();
      render(this._container, this._noPointsComponent);
      return;
    }

    if (this._noPointsComponent) {
      remove(this._noPointsComponent);
      this._noPointsComponent = null;
    }

    this._tripDaysComponent = new TripDaysComponent();
    this._sortsComponent = new SortsComponent();

    render(this._container, this._sortsComponent);
    render(this._container, this._tripDaysComponent);
    this._sortsComponent.setSortTypeChangeHandler(this._onSortTypeChange);

    const showingEvents = groupingEventsInOrderForDays(getSortedEvents(events));
    this._showedPointControllers = this._renderDay(showingEvents);
  }

  _renderDay(events, isGroupedByDay = true) {
    const tripDaysList = this._tripDaysComponent.getElement();
    tripDaysList.innerHTML = ``;
    let eventControllers = [];
    if (isGroupedByDay) {
      let dayNumber = 1;
      for (const eventsForDay of events) {
        const newDayComponent = new TripDayComponent(eventsForDay, dayNumber);
        const tripEventsList = newDayComponent.getElement().querySelector(`.trip-events__list`);
        eventControllers = eventControllers.concat(eventsForDay.map((event) => this._renderEvents(event, tripEventsList)));
        render(tripDaysList, newDayComponent);
        dayNumber++;
      }
    } else {
      const newDayComponent = new TripDayComponent(events);
      const tripEventsList = newDayComponent.getElement().querySelector(`.trip-events__list`);
      eventControllers = events.map((event) => this._renderEvents(event, tripEventsList));
      render(tripDaysList, newDayComponent);
    }
    return eventControllers;
  }

  _renderEvents(event, container) {
    const pointController = new PointController(container, this._onDataChange, this._onViewChange, this._destinationsModel.getDestinations(), this._offersModel.getOffers());
    pointController.render(event, pointControllerMode.DEFAULT);
    return pointController;
  }

  createEvent() {
    const destinations = this._destinationsModel.getDestinations();
    const offersModel = this._offersModel.getOffers();

    if (this._creatingEvent) {
      return;
    }
    this._onViewChange();
    this._creatingEvent = new PointController(this._container, this._onDataChange, this._onViewChange, destinations, offersModel);
    this._creatingEvent.render(EmptyEvent, pointControllerMode.ADDING);
  }

  _onDataChange(controller, oldData, newData) {
    if (oldData === EmptyEvent) {
      this._creatingEvent = null;
      if (newData === null) {
        this._callHandlers(this._addedNewEventHandlers);
        controller.destroy();
        this._upDateEvent();
      } else {
        this._api.createEvent(newData)
          .then((pointModel) => {
            this._eventsModel.addEvent(pointModel);
            controller.setDefaultButtonText();
            controller.unblockForm();
            this._upDateEvent();
            controller.destroy();
            this._callHandlers(this._addedNewEventHandlers);
          })
          .catch(() => {
            controller.setDefaultButtonText();
            controller.shake();
            controller.unblockForm();
          });
      }
    } else if (newData === null) {
      this._api.deleteEvent(oldData.id)
        .then(() => {
          this._eventsModel.removeEvent(oldData.id);
          controller.setDefaultButtonText();
          controller.unblockForm();
          this._upDateEvent();
        })
        .catch(() => {
          controller.setDefaultButtonText();
          controller.shake();
          controller.unblockForm();
        });
    } else {
      this._api.updateEvent(oldData.id, newData)
        .then((pointModel) => {
          const isSuccess = this._eventsModel.upDateEvent(oldData.id, pointModel);
          if (isSuccess) {
            controller.setDefaultButtonText();
            controller.unblockForm();
            controller.render(pointModel, pointControllerMode.DEFAULT);
          }
        })
        .catch(() => {
          controller.setDefaultButtonText();
          controller.shake();
          controller.unblockForm();
        });
    }
  }

  _onViewChange() {
    this._showedPointControllers.forEach((pointController) => pointController._setDefaultView());
  }

  _onSortTypeChange(sortType) {
    this._removeEvents();
    this._removeCreatedEvent();

    const sortedEvents = getSortedEvents(this._eventsModel.getEvents(), sortType);

    const isGroupedByDay = sortType === SortType.EVENT;
    const showingEvents = isGroupedByDay ? groupingEventsInOrderForDays(sortedEvents) : sortedEvents;

    this._showedPointControllers = this._renderDay(showingEvents, isGroupedByDay);
  }
  _removeCreatedEvent() {
    if (!this._creatingEvent) {
      return;
    }
    this._creatingEvent.destroy();
    this._creatingEvent = null;
    this._callHandlers(this._addedNewEventHandlers);
  }

  _removeEvents() {
    this._showedPointControllers.forEach((controller) => controller.destroy());
    this._showedPointControllers = [];
  }

  _removeDayList() {
    if (!this._sortsComponent && !this._tripDaysComponent) {
      return;
    }
    remove(this._sortsComponent);
    remove(this._tripDaysComponent);
    this._removeCreatedEvent();
    this._removeEvents();
  }

  _upDateEvent() {
    this._removeDayList();
    this.render();
  }

  _onFilterChange() {
    this._upDateEvent();
  }

  setAddedNewEventHandler(handler) {
    this._addedNewEventHandlers.push(handler);
  }

  _callHandlers(handelrs) {
    handelrs.forEach((handler) => handler());
  }

  hide() {
    this._container.classList.add(HIDDEN_CLASS);
  }

  show() {
    this._container.classList.remove(HIDDEN_CLASS);
  }
  _renderLoading() {
    render(this._container, this._loadingComponent);
  }
}
