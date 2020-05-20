const HIDDEN_CLASS = `trip-events--hidden`;

const TYPE_OF_TRIP_POINT = [
  `taxi`,
  `bus`,
  `train`,
  `ship`,
  `transport`,
  `drive`,
  `flight`,
  `check-in`,
  `sightseeing`,
  `restaurant`
];

const MONTH_NAMES = [
  `JAN`,
  `FEB`,
  `MAR`,
  `APR`,
  `MAY`,
  `JUN`,
  `JUL`,
  `AUG`,
  `SEP`,
  `OCT`,
  `NOV`,
  `DEC`,
];

const SORT_OPTION = [
  `Event`,
  `Time`,
  `Price`
];

const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

const MenuOption = {
  TABLE: `table`,
  STATS: `stats`
};


export {HIDDEN_CLASS, TYPE_OF_TRIP_POINT, MONTH_NAMES, SORT_OPTION, FilterType, MenuOption};
