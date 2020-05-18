import AbstractComponent from "./abstract-componenet.js";

const MenuItem = {
  TABLE: `Table`,
  STATS: `Stats`,
};

const activeMenuClass = `trip-tabs__btn--active`;

const createMenuTmpl = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn" href="#">${MenuItem.TABLE}</a>
    <a class="trip-tabs__btn" href="#">${MenuItem.STATS}</a>
  </nav>`;
};

export default class Menu extends AbstractComponent {
  constructor() {
    super();
    this._activeMenuElement = null;
    this._defaultActiveMenuItem();
  }
  getTemplate() {
    return createMenuTmpl();
  }

  setClickMenuItemHandler(handler) {
    this._element.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      if (evt.target.tagName !== `A`) {
        return;
      }
      if (evt.target === this._activeMenuElement) {
        return;
      }
      this._activeMenuElement.classList.remove(activeMenuClass);
      this._activeMenuElement = evt.target;
      this._activeMenuElement.classList.add(activeMenuClass);
      handler(evt.target.textContent);
    });
  }

  _defaultActiveMenuItem() {
    this._activeMenuElement = this.getElement().firstElementChild;
    this._activeMenuElement.classList.add(activeMenuClass);
  }
}

export {MenuItem};
