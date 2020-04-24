import AbstractComponent from './abstract-componenet';


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
