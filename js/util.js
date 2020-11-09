'use strict';

(function () {
  const PRIMARY_MOUSE_BUTTON = 0;

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

  function isPrimaryMouseButtonPress(evt, action) {
    if (evt.button === PRIMARY_MOUSE_BUTTON) {
      action();
    }
  }

  function isEscPress(evt, action) {
    if (evt.key === `Escape`) {
      action();
    }
  }

  function isEnterPress(evt, action) {
    if (evt.key === `Enter`) {
      action();
    }
  }

  function isDocumentClick(action) {
    document.addEventListener(`click`, function () {
      action();
    });
  }

  window.util = {
    getRandom,
    getRandomItem,
    getRandomItems,
    isPrimaryMouseButtonPress,
    isEscPress,
    isEnterPress,
    isDocumentClick
  };
})();
