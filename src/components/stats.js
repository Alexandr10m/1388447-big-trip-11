import AbstractSmartComponent from "./abstract-smart-component.js";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {TYPE_OF_TRIP_POINT} from "../constants.js";
import {formatDiffDays, formatDay, filteredTransferEvents} from "../utils/common.js";


const BAR_HEIGHT = 55;
const heightMoneyChart = `${BAR_HEIGHT * TYPE_OF_TRIP_POINT.length}px`;
const heightTrasportChart = `${BAR_HEIGHT * filteredTransferEvents().length}px`;
const heightSpendTimeChart = `${BAR_HEIGHT * TYPE_OF_TRIP_POINT.length}px`;

const calcMoneyOnActivityes = (events, activity) => {
  const allEventsByActivity = events.filter((event) => event.typeOfPoint === activity);
  return allEventsByActivity.reduce((sum, current) => sum + current.price, 0);
};
const coutTransportByType = (events, type) => {
  return events.filter((event) => event.typeOfPoint === type.toLowerCase()).length;
};
const countDaysByActivity = (events, activity) => {
  let diffTime = 0;
  events.forEach((event) => {
    if (event.typeOfPoint === activity) {
      diffTime = diffTime + formatDiffDays(event);
    }
  });

  return formatDay(diffTime);
};


const renderMoneyChart = (ctx, events) => {
  const typeOfPoint = TYPE_OF_TRIP_POINT.map((type) => type.toUpperCase());
  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: typeOfPoint,
      datasets: [{
        data: TYPE_OF_TRIP_POINT.map((type) => calcMoneyOnActivityes(events, type)),
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTransportChart = (ctx, events) => {
  const transportTypes = filteredTransferEvents();

  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: transportTypes,
      datasets: [{
        data: transportTypes.map((type) => coutTransportByType(events, type)),
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TRANSPORT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderSpendTimeChart = (ctx, events) => {
  const typeOfPoint = TYPE_OF_TRIP_POINT.map((type) => type.toUpperCase());
  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: typeOfPoint,
      datasets: [{
        data: TYPE_OF_TRIP_POINT.map((type) => countDaysByActivity(events, type)),
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}D`
        }
      },
      title: {
        display: true,
        text: `SPEND TIME`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};


const createStatsTmpl = () => {
  return (
    `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>

    <div class="statistics__item statistics__item--money">
      <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--transport">
      <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--time-spend">
      <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
    </div>
  </section>`
  );
};

export default class Stats extends AbstractSmartComponent {
  constructor(events) {
    super();
    this._events = events;
    this._moneyChart = null;
    this._transportChart = null;
    this._timeSpendChart = null;

    this._renderChanrts();
  }

  getTemplate() {
    return createStatsTmpl();
  }

  _renderChanrts() {
    const element = this.getElement();
    const moneyCtx = element.querySelector(`.statistics__chart--money`);
    const transportCtx = element.querySelector(`.statistics__chart--transport`);
    const timeSpendCtx = element.querySelector(`.statistics__chart--time`);

    moneyCtx.style.height = heightMoneyChart;
    transportCtx.style.height = heightTrasportChart;
    timeSpendCtx.style.height = heightSpendTimeChart;

    this._resetCharts();

    this._moneyChart = renderMoneyChart(moneyCtx, this._events.getEvents());
    this._transportChart = renderTransportChart(transportCtx, this._events.getEvents());
    this._timeSpendChart = renderSpendTimeChart(timeSpendCtx, this._events.getEvents());
  }

  show() {
    super.show();
    this._rerender(this._events);
  }

  _rerender(events) {
    this._events = events;
    super.rerender();
    this._renderChanrts();
  }

  _resetCharts() {
    if (this._moneyChart) {
      this._moneyChart.destroy();
      this._moneyChart = null;
    }

    if (this._transportChart) {
      this._transportChart.destroy();
      this._transportChart = null;
    }

    if (this._timeSpendChart) {
      this._timeSpendChart.destroy();
      this._timeSpendChart = null;
    }
  }

  recoveryListeners() {}
}
