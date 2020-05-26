import EventComponent from "../components/event.js";
import EventEditorComponent from "../components/form-editor.js";
import PointModel from "../models/point.js";
import {render, replace, remove, RenderPosition} from "../utils/render.js";

const SHAKE_ANIMATION_TIMEOUT = 600;

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

const parseDate = (dateString) => {
  const time = dateString.split(`/`);
  return new Date(`${time[1]} ${time[0]} ${time[2]} ${time[3]}`);
};

const adapterDestination = (destination) => {
  return {
    "description": destination.description,
    "name": destination.name,
    "pictures": destination.photos,
  };
};

export default class PointController {
  constructor(container, onDataChange, onViewChange, destinations, offers) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._destinations = destinations;
    this._offers = offers;
    this._typesOfPoint = [];
    this._cityes = [];
    this._eventComponent = null;
    this._eventEditorComponent = null;
    this._mode = Modes.DEFAULT;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(event, mode) {
    const oldEventComponent = this._eventComponent;
    const oldEventEditorComponent = this._eventEditorComponent;
    this._mode = mode;

    this._typesOfPoint = this._offers.map((it) => it.type);
    this._cityes = this._destinations.map((it) => it.name);

    this._eventComponent = new EventComponent(event);
    this._eventEditorComponent = new EventEditorComponent(event, this._typesOfPoint, this._cityes);

    this._eventComponent.setEditButtonClickHandler(() => {
      this._replaceEventToEditor();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventEditorComponent.setFormSubmitHandler(() => {
      const formData = this._eventEditorComponent.getData();
      const data = this._parseFormData(formData);
      this._eventEditorComponent.disabledForm();
      this._eventEditorComponent.setData({saveButtonText: `Saving...`});
      this._onDataChange(this, event, data);
    });

    this._eventEditorComponent.setFavouritesButtonClickHandler(() => {
      const newPoint = PointModel.clone(event);
      newPoint.isFavourite = !newPoint.isFavourite;

      this._onDataChange(this, event, newPoint);
    });

    this._eventEditorComponent.setDeleteButtonClickHandler(() => {
      this._eventEditorComponent.disabledForm();
      this._eventEditorComponent.setData({deleteButtonText: `Deleting...`});
      this._onDataChange(this, event, null);
    });

    this._eventEditorComponent.setCloseButtonClickHandler(() => {
      if (this._mode === Modes.ADDING) {
        this._onDataChange(this, EmptyEvent, null);
      } else {
        this._replaceEditorToEvent();
      }
    });

    this._eventEditorComponent.setInputEventTypeClickHandler((type) => {
      const offer = this._offers.find((it) => it.type.toLowerCase() === type.toLowerCase());
      return offer.offers;
    });

    this._eventEditorComponent.setInputCityClickHandler((city) => {
      return this._destinations.find((it) => it.name.toLowerCase() === city.toLowerCase());
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
  _parseFormData(formData) {
    const type = formData.get(`event-type`);
    const typeOffer = this._offers.find((it) => it.type === type);
    const city = formData.get(`event-destination`);
    const destination = this._destinations.find((it) => it.name === city);

    return new PointModel({
      "base_price": Number(formData.get(`event-price`)),
      "date_from": parseDate(formData.get(`event-start-time`)).toISOString(),
      "date_to": parseDate(formData.get(`event-end-time`)).toISOString(),
      "is_favorite": !!formData.get(`event-favorite`),
      "type": type,
      "offers": typeOffer.offers,
      "destination": adapterDestination(destination),
    });
  }

  unblockForm() {
    this._eventEditorComponent.enabledForm();
  }

  setDefaultButtonText() {
    this._eventEditorComponent.setData({
      saveButtonText: `Save`,
      deleteButtonText: `Delete`,
    });
  }

  shake() {
    const formEvent = this._eventEditorComponent.getElement();
    const event = this._eventComponent.getElement();

    formEvent.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    event.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    formEvent.style.border = `1px solid red`;

    setTimeout(() => {
      formEvent.style.animation = ``;
      event.style.animation = ``;
      formEvent.style.border = ``;
    }, SHAKE_ANIMATION_TIMEOUT);
  }
}

export {Modes, EmptyEvent};
