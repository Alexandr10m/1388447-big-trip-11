export default class Point {
  constructor(data) {
    this.id = data[`id`];
    this.typeOfPoint = data[`type`];
    this.city = data[`destination`][`name`];
    this.destination = {
      description: data[`destination`][`description`],
      photos: data[`destination`][`pictures`],
    };
    this.offers = data[`offers`];
    this.isFavourite = Boolean(data[`is_favorite`]);
    this.timeFrame = {
      start: data[`date_from`] ? new Date(data[`date_from`]) : null,
      finish: data[`date_to`] ? new Date(data[`date_to`]) : null,
    };
    this.price = data[`base_price`];

  }

  toRAW() {
    return {
      "base_price": this.price,
      "date_from": this.timeFrame.start ? this.timeFrame.start.toISOString() : null,
      "date_to": this.timeFrame.finish ? this.timeFrame.finish.toISOString() : null,
      "id": this.id,
      "is_favorite": this.isFavourite,
      "type": this.typeOfPoint,
      "offers": this.offers,
      "destination": {
        "description": this.destination.description,
        "name": this.city,
        "pictures": this.destination.photos,
      },
    };
  }

  static parseEvent(data) {
    return new Point(data);
  }

  static parseEvents(data) {
    return data.map(Point.parseEvent);
  }

  static clone(data) {
    return new Point(data.toRAW());
  }
}
