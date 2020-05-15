import EventComponent from "../components/event.js";
import EventEditorComponent from "../components/form-editor.js";
import {render, replace, remove, RenderPosition} from "../utils/render.js";

const Modes = {
  DEFAULT: `default`,
  EDIT: `edit`,
  ADDING: `adding`
};

const EmptyEvent = {
  typeOfPoint: `bus`,
  city: ``,
  offers: ``,
  destination: null,
  price: ``,
  timeFrame: null,
  isFavourite: false
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

  render(event, mode) {
    const oldEventComponent = this._eventComponent;
    const oldEventEditorComponent = this._eventEditorComponent;
    this._mode = mode;

    this._eventComponent = new EventComponent(event);
    this._eventEditorComponent = new EventEditorComponent(event);

    this._eventComponent.setEditButtonClickHandler(() => {
      this._replaceEventToEditor();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventEditorComponent.setFormSubmitHandler((evt) => {
      evt.preventDefault();
      const data = this._eventEditorComponent.getData();
      this._onDataChange(this, event, data);
    });

    this._eventEditorComponent.setFavouritesButtonClickHandler(() => {
      this._onDataChange(this, event, Object.assign({}, event, {isFavourite: !event.isFavourite}));
    });

    this._eventEditorComponent.setDeleteButtonClickHandler(() => {
      this._onDataChange(this, event, null);
    });

    this._eventEditorComponent.setCloseButtonClickHandler(() => {
      if (this._mode === Modes.ADDING) {
        this._onDataChange(this, EmptyEvent, null);
      } else {
        this._replaceEditorToEvent();
      }
    });

    switch (mode) {
      case Modes.DEFAULT:
        if (oldEventComponent && oldEventEditorComponent) {
          replace(this._eventComponent, oldEventComponent);
          replace(this._eventEditorComponent, oldEventEditorComponent);
          this._replaceEditorToEvent();
        } else {
          render(this._container, this._eventComponent);
        }
        break;
      case Modes.ADDING:
        if (oldEventComponent && oldEventEditorComponent) {
          remove(oldEventEditorComponent);
          remove(oldEventComponent);
        }
        document.addEventListener(`keydown`, this._onEscKeyDown);
        render(this._container, this._eventEditorComponent, RenderPosition.AFTERBEGIN);
        break;
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
    if (document.contains(this._eventEditorComponent.getElement())) {
      replace(this._eventComponent, this._eventEditorComponent);
    }
    this._mode = Modes.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      if (this._mode === Modes.ADDING) {
        this._onDataChange(this, EmptyEvent, null);
      }
      this._replaceEditorToEvent();
    }
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._eventEditorComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
}

export {Modes, EmptyEvent};
