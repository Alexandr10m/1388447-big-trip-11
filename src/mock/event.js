import {TYPE_OF_TRIP_POINT} from "../constants.js";
const CITYES = [
  `Amsterdam`,
  `Moscow`,
  `Odessa`,
  `Sochi`,
  `Roma`
];
const OFFERS = {
  "taxi": [{
    name: `luggage`,
    title: `Add luggage`,
    price: 30
  }, {
    name: `comfort`,
    title: `Switch to comfort class`,
    price: 100
  }, {
    name: `meal`,
    title: `Add meal`,
    price: 15
  }, {
    name: `seats`,
    title: `Choose seats`,
    price: 5
  }, {
    name: `train`,
    title: `Travel by train`,
    price: 40
  }],
  "bus": [{
    name: `luggage`,
    title: `Add luggage`,
    price: 30
  }, {
    name: `comfort`,
    title: `Switch to comfort class`,
    price: 100
  }, {
    name: `meal`,
    title: `Add meal`,
    price: 15
  }, {
    name: `seats`,
    title: `Choose seats`,
    price: 5
  }, {
    name: `train`,
    title: `Travel by train`,
    price: 40
  }],
  "train": [{
    name: `luggage`,
    title: `Add luggage`,
    price: 30
  }, {
    name: `comfort`,
    title: `Switch to comfort class`,
    price: 100
  }, {
    name: `meal`,
    title: `Add meal`,
    price: 15
  }, {
    name: `seats`,
    title: `Choose seats`,
    price: 5
  }, {
    name: `train`,
    title: `Travel by train`,
    price: 40
  }],
  "ship": [{
    name: `luggage`,
    title: `Add luggage`,
    price: 30
  }, {
    name: `comfort`,
    title: `Switch to comfort class`,
    price: 100
  }, {
    name: `meal`,
    title: `Add meal`,
    price: 15
  }, {
    name: `seats`,
    title: `Choose seats`,
    price: 5
  }, {
    name: `train`,
    title: `Travel by train`,
    price: 40
  }],
  "transport": [{
    name: `luggage`,
    title: `Add luggage`,
    price: 30
  }, {
    name: `comfort`,
    title: `Switch to comfort class`,
    price: 100
  }, {
    name: `meal`,
    title: `Add meal`,
    price: 15
  }, {
    name: `seats`,
    title: `Choose seats`,
    price: 5
  }, {
    name: `train`,
    title: `Travel by train`,
    price: 40
  }],
  "drive": [{
    name: `luggage`,
    title: `Add luggage`,
    price: 30
  }, {
    name: `comfort`,
    title: `Switch to comfort class`,
    price: 100
  }, {
    name: `meal`,
    title: `Add meal`,
    price: 15
  }, {
    name: `seats`,
    title: `Choose seats`,
    price: 5
  }, {
    name: `train`,
    title: `Travel by train`,
    price: 40
  }],
  "flight": [{
    name: `luggage`,
    title: `Add luggage`,
    price: 30
  }, {
    name: `comfort`,
    title: `Switch to comfort class`,
    price: 100
  }, {
    name: `meal`,
    title: `Add meal`,
    price: 15
  }, {
    name: `seats`,
    title: `Choose seats`,
    price: 5
  }, {
    name: `train`,
    title: `Travel by train`,
    price: 40
  }],
  "check-in": [{
    name: `luggage`,
    title: `Add luggage`,
    price: 30
  }, {
    name: `comfort`,
    title: `Switch to comfort class`,
    price: 100
  }, {
    name: `meal`,
    title: `Add meal`,
    price: 15
  }, {
    name: `seats`,
    title: `Choose seats`,
    price: 5
  }, {
    name: `train`,
    title: `Travel by train`,
    price: 40
  }],
  "sightseeing": [{
    name: `luggage`,
    title: `Add luggage`,
    price: 30
  }, {
    name: `comfort`,
    title: `Switch to comfort class`,
    price: 100
  }, {
    name: `meal`,
    title: `Add meal`,
    price: 15
  }, {
    name: `seats`,
    title: `Choose seats`,
    price: 5
  }, {
    name: `train`,
    title: `Travel by train`,
    price: 40
  }],
  "restaurant": [{
    name: `luggage`,
    title: `Add luggage`,
    price: 30
  }, {
    name: `comfort`,
    title: `Switch to comfort class`,
    price: 100
  }, {
    name: `meal`,
    title: `Add meal`,
    price: 15
  }, {
    name: `seats`,
    title: `Choose seats`,
    price: 5
  }, {
    name: `train`,
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
  photos: [`http://picsum.photos/248/152?r=${Math.random()}`, `http://picsum.photos/248/152?r=${Math.random()}`]
};
const getRandomArrayItem = (array) => {
  const randomItem = getRandomIntegerNumber(0, array.length);
  return array[randomItem];
};
const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};
const getRandomArrayLength = (array, end = array.length) => {
  const newArrayLength = new Array(getRandomIntegerNumber(0, end))
  .fill(``)
  .map(() => getRandomArrayItem(array));
  return newArrayLength;
};

const getRandomTimeFrame = () => {
  const startDate = new Date(2020, 3, getRandomIntegerNumber(12, 16), getRandomIntegerNumber(8, 16));
  const finishDate = new Date(2020, 3, startDate.getDate(), startDate.getHours(), startDate.getMinutes() + getRandomIntegerNumber(5, 120));
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
