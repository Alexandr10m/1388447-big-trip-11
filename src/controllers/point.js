import EventComponent from "../components/event.js";
import EventEditorComponent from "../components/form-editor.js";
import {render, replace} from "../utils/render.js";


export default class PointController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._eventComponent = null;
    this._eventEditorComponent = null;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(event) {
    this._eventComponent = new EventComponent(event);
    this._eventEditorComponent = new EventEditorComponent(event);

    this._eventComponent.setEditButtonClickHandler(() => {
      this._replaceEventToEditor();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventEditorComponent.setFormSubmitHandler((evt) => {
      evt.preventDefault();
      this._replaceEditorToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventEditorComponent.setFavouritesButtonClickHandler(() => {
      this._onDataChange(event, Object.assign({}, event, {isFavourite: !event.isFavourite}));
    });

    render(this._container, this._eventComponent);
  }

  _replaceEventToEditor() {
    replace(this._eventEditorComponent, this._eventComponent);
  }

  _replaceEditorToEvent() {
    replace(this._eventComponent, this._eventEditorComponent);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      this._replaceEditorToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
