import AbstractComponent from "./abstract-componenet.js";


const createTripInfoContainerTmpl = () => {
  return `<section class="trip-main__trip-info  trip-info"></section>`;
};

export default class TripInfo extends AbstractComponent {
  getTemplate() {
    return createTripInfoContainerTmpl();
  }
}
