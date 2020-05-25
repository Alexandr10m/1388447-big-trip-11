import {TYPE_OF_TRIP_POINT} from "../constants.js";


const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomArrayItem = (array) => {
  const randomItem = getRandomIntegerNumber(0, array.length);
  return array[randomItem];
};

const CITYES = [
  `Amsterdam`,
  `Moscow`,
  `Odessa`,
  `Sochi`,
  `Roma`
];
const OFFERS = {
  "taxi": [{
    title: `Add luggage`,
    price: 30
  }, {
    title: `Switch to comfort class`,
    price: 100
  }, {
    title: `Add meal`,
    price: 15
  }, {
    title: `Choose seats`,
    price: 5
  }, {
    title: `Travel by train`,
    price: 40
  }],
  "bus": [{
    title: `Add luggage`,
    price: 30
  }, {
    title: `Switch to comfort class`,
    price: 100
  }, {
    title: `Add meal`,
    price: 15
  }, {
    title: `Choose seats`,
    price: 5
  }, {
    title: `Travel by train`,
    price: 40
  }],
  "train": [{
    title: `Add luggage`,
    price: 30
  }, {
    title: `Switch to comfort class`,
    price: 100
  }, {
    title: `Add meal`,
    price: 15
  }, {
    title: `Choose seats`,
    price: 5
  }, {
    title: `Travel by train`,
    price: 40
  }],
  "ship": [{
    title: `Add luggage`,
    price: 30
  }, {
    title: `Switch to comfort class`,
    price: 100
  }, {
    title: `Add meal`,
    price: 15
  }, {
    title: `Choose seats`,
    price: 5
  }, {
    title: `Travel by train`,
    price: 40
  }],
  "transport": [{
    title: `Add luggage`,
    price: 30
  }, {
    title: `Switch to comfort class`,
    price: 100
  }, {
    title: `Add meal`,
    price: 15
  }, {
    title: `Choose seats`,
    price: 5
  }, {
    title: `Travel by train`,
    price: 40
  }],
  "drive": [{
    title: `Add luggage`,
    price: 30
  }, {
    title: `Switch to comfort class`,
    price: 100
  }, {
    title: `Add meal`,
    price: 15
  }, {
    title: `Choose seats`,
    price: 5
  }, {
    title: `Travel by train`,
    price: 40
  }],
  "flight": [{
    title: `Add luggage`,
    price: 30
  }, {
    title: `Switch to comfort class`,
    price: 100
  }, {
    title: `Add meal`,
    price: 15
  }, {
    title: `Choose seats`,
    price: 5
  }, {
    title: `Travel by train`,
    price: 40
  }],
  "check-in": [{
    title: `Add luggage`,
    price: 30
  }, {
    title: `Switch to comfort class`,
    price: 100
  }, {
    title: `Add meal`,
    price: 15
  }, {
    title: `Choose seats`,
    price: 5
  }, {
    title: `Travel by train`,
    price: 40
  }],
  "sightseeing": [{
    title: `Add luggage`,
    price: 30
  }, {
    title: `Switch to comfort class`,
    price: 100
  }, {
    title: `Add meal`,
    price: 15
  }, {
    title: `Choose seats`,
    price: 5
  }, {
    title: `Travel by train`,
    price: 40
  }],
  "restaurant": [{
    title: `Add luggage`,
    price: 30
  }, {
    title: `Switch to comfort class`,
    price: 100
  }, {
    title: `Add meal`,
    price: 15
  }, {
    title: `Choose seats`,
    price: 5
  }, {
    title: `Travel by train`,
    price: 40
  }],
};
const DESTINATION = {
  desription: [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`
  ],
  photos: [{
    src: `http://picsum.photos/248/152?r=${Math.random()}`,
    description: `${getRandomArrayItem(CITYES)}`,
  },
  {
    src: `http://picsum.photos/248/152?r=${Math.random()}`,
    description: `${getRandomArrayItem(CITYES)}`,
  },
  {
    src: `http://picsum.photos/248/152?r=${Math.random()}`,
    description: `${getRandomArrayItem(CITYES)}`,
  }],
};


const getRandomArrayLength = (array, end = array.length) => {
  const newArrayLength = new Array(getRandomIntegerNumber(0, end))
  .fill(``)
  .map(() => getRandomArrayItem(array));
  return newArrayLength;
};

const getRandomTimeFrame = () => {
  const startDate = new Date(2020, getRandomIntegerNumber(1, 12), getRandomIntegerNumber(1, 30), getRandomIntegerNumber(1, 24), getRandomIntegerNumber(1, 60));
  const finishDate = new Date(2020, startDate.getMonth(), startDate.getDate() + getRandomIntegerNumber(1, 5), startDate.getHours() + getRandomIntegerNumber(1, 24), startDate.getMinutes() + getRandomIntegerNumber(5, 60));
  return {
    start: startDate,
    finish: finishDate
  };
};
const generateEvent = () => {
  return (
    {
      id: String(new Date() + Math.random()),
      typeOfPoint: getRandomArrayItem(TYPE_OF_TRIP_POINT),
      city: getRandomArrayItem(CITYES),
      offers: getRandomArrayLength(OFFERS[getRandomArrayItem(TYPE_OF_TRIP_POINT)]),
      destination: {
        description: `${getRandomArrayLength(DESTINATION.desription, 5).join(` `)}`,
        photos: DESTINATION.photos,
      },
      price: getRandomIntegerNumber(5, 1000),
      timeFrame: getRandomTimeFrame(),
      isFavourite: Math.random() > 0.5
    }
  );
};

const generateEvents = (number) => {
  const events = new Array(number)
    .fill(``)
    .map(generateEvent);

  return events;
};

export {generateEvents, CITYES, OFFERS, DESTINATION, getRandomArrayLength, getRandomArrayItem};
