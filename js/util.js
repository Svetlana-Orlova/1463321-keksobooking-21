'use strict';

const PRIMARY_MOUSE_BUTTON = 0;

const OFFER_TYPES = {
  flat: {
    minPrice: `1000`,
    text: `Квартира`
  },
  house: {
    minPrice: `5000`,
    text: `Дом`
  },
  palace: {
    minPrice: `10000`,
    text: `Дворец`
  },
  bungalow: {
    minPrice: `0`,
    text: `Бунгало`
  }
};

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomItem(list) {
  let randomItem = list[Math.floor(Math.random() * list.length)];
  return randomItem;
}

function getRandomItems(array) {
  const newArray = array.slice();
  for (let i = 1; i <= getRandom(0, array.length); i++) {
    const arrayItem = getRandomItem(newArray);
    newArray.splice(newArray.indexOf(arrayItem), 1);
  }
  return newArray;
}

function onPrimaryMouseButtonPress(evt, action) {
  if (evt.button === PRIMARY_MOUSE_BUTTON) {
    action();
  }
}

function onEscPress(evt, action) {
  if (evt.key === `Escape`) {
    action();
  }
}

function onEnterPress(evt, action) {
  if (evt.key === `Enter`) {
    action();
  }
}

function addDocumentClick(action) {
  document.addEventListener(`click`, function () {
    action();
  });
}

window.util = {
  offerTypes: OFFER_TYPES,
  getRandom,
  getRandomItem,
  getRandomItems,
  onPrimaryMouseButtonPress,
  onEscPress,
  onEnterPress,
  addDocumentClick
};
