import {getInfoRouteTmpl} from './components/trip-info';
import {getPriceTmpl} from './components/price';
import {getMenuTmpl} from './components/menu';
import {getFiltersTmpl} from './components/filters';
import {getSortTmpl} from './components/sorts';
import {getFormEditTmpl} from './components/form-editor';
import {getEvenstsContainer} from './components/events-container';
import {getEventTmpl} from './components/event';
import {getSectionTmpl} from './components/section';
import {render} from './utils';

const TASK_COUNT = 3;

const renderTripInfo = () => {
  render(tripMainElement, getSectionTmpl(), `afterbegin`);
  const tripInfo = tripMainElement.querySelector(`.trip-main__trip-info`);
  render(tripInfo, getInfoRouteTmpl());
  render(tripInfo, getPriceTmpl());
};
const renderControls = () => {
  const tripControlsElemnt = tripMainElement.querySelector(`.trip-main__trip-controls`);
  render(tripControlsElemnt.children[0], getMenuTmpl(), `afterend`);
  render(tripControlsElemnt, getFiltersTmpl());
};
const renderSorts = () => {
  render(tripEventsElement, getSortTmpl());
};
const renderFormEdit = () => {
  render(tripEventsElement, getFormEditTmpl());
};
const renderEvent = (count) => {
  const tripListElement = tripEventsElement.querySelector(`.trip-events__list`);
  for (let i = 0; i < count; i++) {
    render(tripListElement, getEventTmpl());
  }
};
const renderEvents = (number) => {
  render(tripEventsElement, getEvenstsContainer());
  renderEvent(number);
};

const tripMainElement = document.querySelector(`.trip-main`);
renderTripInfo();
renderControls();

const tripEventsElement = document.querySelector(`.trip-events`);
renderFormEdit();
renderSorts();
renderEvents(TASK_COUNT);
