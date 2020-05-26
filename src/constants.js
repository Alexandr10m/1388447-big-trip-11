const HIDDEN_CLASS = `trip-events--hidden`;

const TYPES_OF_TRIP_POINTS = [
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

const SORT_OPTIONS = [
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


export {HIDDEN_CLASS, TYPES_OF_TRIP_POINTS, MONTH_NAMES, SORT_OPTIONS, FilterType, MenuOption};
