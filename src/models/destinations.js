export default class Destinations {
  constructor() {
    this._destinations = [];
  }

  setDestinations(destinations) {
    this._destinations = destinations;
    this._cityes = destinations.map((it) => it.name);
  }

  getDestinations() {
    return this._destinations;
  }
}
