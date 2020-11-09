'use strict';
(function () {
  const mapElement = document.querySelector(`.map`);

  function disableMap() {
    mapElement.classList.add(`map--faded`);
  }

  function enableMap() {
    mapElement.classList.remove(`map--faded`);
  }

  window.map = {
    disable: disableMap,
    enable: enableMap
  };
})();
