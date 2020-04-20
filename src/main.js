import {getInfoRouteTmpl} from './components/trip-info';
import {getPriceTmpl} from './components/price';
import {getMenuTmpl} from './components/menu';
import {getFiltersTmpl} from './components/filters';
import {getSortTmpl} from './components/sorts';
import {getFormEditorTmpl} from './components/form-editor';
import {getEvenstsforAllDaysTmpl} from './components/events';
import {getSectionTmpl} from './components/section';
import {render, groupingEventsInOrderForDays} from './utils';
import {generateEvents} from './mock/event';

const EVENT_COUNT = 20;
const events = generateEvents(EVENT_COUNT);

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
  render(tripEventsElement, getFormEditorTmpl(events[0]));
};
const renderEvents = (allEvents) => {
  render(tripEventsElement, getEvenstsforAllDaysTmpl(groupingEventsInOrderForDays(allEvents)));
};

const tripMainElement = document.querySelector(`.trip-main`);
renderTripInfo();
renderControls();

const tripEventsElement = document.querySelector(`.trip-events`);
events.sort((prevEvent, nextEvent) => prevEvent.timeFrame.start.getTime() - nextEvent.timeFrame.start.getTime());
renderFormEdit();
renderSorts();
renderEvents(events);
