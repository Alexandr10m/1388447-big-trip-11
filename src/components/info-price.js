import AbstractComponent from "./abstract-componenet.js";


const createPriceTmpl = () => {
  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
  </p>`;
};

export default class InfoPrice extends AbstractComponent {
  getTemplate() {
    return createPriceTmpl();
  }
}
