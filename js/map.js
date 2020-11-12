'use strict';

const mapElement = document.querySelector(`.map`);

const disableMap = () => {
  mapElement.classList.add(`map--faded`);
};

const enableMap = () => {
  mapElement.classList.remove(`map--faded`);
};

window.map = {
  disable: disableMap,
  enable: enableMap
};
