export default class Points {
  constructor() {
    this._events = [];
    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  getEvents() {
    return this._events;
  }

  setEvents(events) {
    this._events = Array.from(events);
    this._callHandler(this._dataChangeHandlers);
  }

  upDateEvent(id, changedEvent) {
    const index = this._events.findIndex((event) => event.id === id);
    if (index === -1) {
      return false;
    }
    this._events = [].concat(this._events.slice(0, index), changedEvent, this._events.slice(index + 1));
    this._callHandler(this._dataChangeHandlers);
    return true;
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandler(handlers) {
    handlers.forEach((handler) => handler());
  }
}
