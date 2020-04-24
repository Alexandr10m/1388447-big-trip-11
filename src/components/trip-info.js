import AbstractComponent from './abstract-componenet';


const createTripInfoContainerTmpl = () => {
  return `<section class="trip-main__trip-info  trip-info"></section>`;
};

export default class TripInfo extends AbstractComponent {
  getTemplate() {
    return createTripInfoContainerTmpl();
  }
}
