import {TYPE_OF_TRIP_POINT} from "../constants.js";
const CITYES = [
  `Amsterdam`,
  `Moscow`,
  `Odessa`,
  `Sochi`,
  `Roma`
];
const OFFERS = {
  "Taxi": [{
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
  "Bus": [{
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
  "Train": [{
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
  "Ship": [{
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
  "Transport": [{
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
  "Drive": [{
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
  "Flight": [{
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
  "Check-in": [{
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
  "Sightseeing": [{
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
  "Restaurant": [{
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
  const randomTypeOfPointer = getRandomArrayItem(TYPE_OF_TRIP_POINT);
  return (
    {
      typeOfPoint: randomTypeOfPointer,
      city: getRandomArrayItem(CITYES),
      offers: getRandomArrayLength(OFFERS[randomTypeOfPointer]),
      destination: {
        description: `${getRandomArrayLength(DESTINATION.desription, 5).join(` `)}`,
        photos: DESTINATION.photos
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

export {generateEvents, CITYES, OFFERS, DESTINATION};
