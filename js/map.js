'use strict';

(function () {
  const PRIMARY_MOUSE_BUTTON = 0;
  const mapElement = document.querySelector(`.map`);
  const mainPinElement = mapElement.querySelector(`.map__pin--main`);
  const fieldsetElements = document.querySelectorAll(`fieldset`);
  const advertFormElement = document.querySelector(`.ad-form`);

  function disableItems(items) {
    for (let i = 0; i < items.length; i++) {
      items[i].setAttribute(`disabled`, true);
    }
  }

  function enableItems(items) {
    mapElement.classList.remove(`map--faded`);
    for (let i = 0; i < items.length; i++) {
      items[i].removeAttribute(`disabled`);
    }
    advertFormElement.classList.remove(`ad-form--disabled`);
  }

  function deactivatePage() {
    mapElement.classList.add(`map--faded`);
    advertFormElement.classList.add(`ad-form--disabled`);
    disableItems(fieldsetElements);
    window.mainPin.fillAddress(mainPinElement);

    mainPinElement.addEventListener(`mousedown`, onPageActivate);
    mainPinElement.addEventListener(`keydown`, onPageActivate);
  }

  function onPageActivate(evt) {
    if (evt.button === PRIMARY_MOUSE_BUTTON || evt.key === `Enter`) {
      enableItems(fieldsetElements);
      window.mainPin.fillAddress(mainPinElement);
      window.pin.insertPins();

      mainPinElement.removeEventListener(`mousedown`, onPageActivate);
      mainPinElement.removeEventListener(`keydown`, onPageActivate);
    }
  }

  window.map = {
    deactivatePage
  };
})();
