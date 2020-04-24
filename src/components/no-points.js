import AbstractComponent from "./abstract-componenet.js";


const createNoPointsTmpl = () => {
  return (
    `<p class="trip-events__msg">
      Click New Event to create your first point
    </p>`
  );
};

export default class NoPoints extends AbstractComponent {
  getTemplate() {
    return createNoPointsTmpl();
  }
}
