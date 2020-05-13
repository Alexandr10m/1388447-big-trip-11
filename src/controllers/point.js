import EventComponent from "../components/event.js";
import EventEditorComponent from "../components/form-editor.js";
import {render, replace, remove} from "../utils/render.js";

const Modes = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._eventComponent = null;
    this._eventEditorComponent = null;
    this._mode = Modes.DEFAULT;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(event) {
    const oldEventComponent = this._eventComponent;
    const oldEventEditorComponent = this._eventEditorComponent;

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
      this._onDataChange(this, event, Object.assign({}, event, {isFavourite: !event.isFavourite}));
    });

    if (oldEventComponent && oldEventEditorComponent) {
      replace(this._eventComponent, oldEventComponent);
      replace(this._eventEditorComponent, oldEventEditorComponent);
    } else {
      render(this._container, this._eventComponent);
    }
  }

  _setDefaultView() {
    if (this._mode !== Modes.DEFAULT) {
      this._replaceEditorToEvent();
    }
  }

  _replaceEventToEditor() {
    this._onViewChange();
    replace(this._eventEditorComponent, this._eventComponent);
    this._mode = Modes.EDIT;
  }

  _replaceEditorToEvent() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._eventEditorComponent.reset();
    replace(this._eventComponent, this._eventEditorComponent);
    this._mode = Modes.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      this._replaceEditorToEvent();
    }
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._eventEditorComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
}
