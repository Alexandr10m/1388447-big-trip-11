import AbstractComponent from "./abstract-componenet.js";


const loadingTmpl = `<p class="trip-events__msg">Loading...</p>`;

export default class Loading extends AbstractComponent {
  getTemplate() {
    return loadingTmpl;
  }
}
