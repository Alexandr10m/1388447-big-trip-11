import AbstractComponent from './abstract-componenet';


const createMenuTmpl = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
    <a class="trip-tabs__btn" href="#">Stats</a>
  </nav>`;
};

export default class Menu extends AbstractComponent {
  getTemplate() {
    return createMenuTmpl();
  }
}
