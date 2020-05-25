export default class Destination {
  constructor(data) {
    this.photos = data[`pictures`];
    this.name = data[`name`];
    this.description = data[`description`];
  }

  static parseEvent(data) {
    return new Destination(data);
  }

  static parseEvents(data) {
    return data.map(Destination.parseEvent);
  }

  static clone(data) {
    return new Destination(data.toRAW());
  }
}
