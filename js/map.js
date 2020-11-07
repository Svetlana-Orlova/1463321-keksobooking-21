'use strict';

(function () {
  const PRIMARY_MOUSE_BUTTON = 0;
  const mapElement = document.querySelector(`.map`);
  const mainPinElement = mapElement.querySelector(`.map__pin--main`);
  const fieldsetElements = document.querySelectorAll(`fieldset`);
  const advertFormElement = document.querySelector(`.ad-form`);

  function disableItems(items) {
    items.forEach((item) => {
      item.setAttribute(`disabled`, true);
    });
  }

  function enableItems(items) {
    mapElement.classList.remove(`map--faded`);
    items.forEach((item) => {
      item.removeAttribute(`disabled`);
    });
    advertFormElement.classList.remove(`ad-form--disabled`);
  }

  function deactivatePage() {
    mapElement.classList.add(`map--faded`);
    advertFormElement.classList.add(`ad-form--disabled`);
    disableItems(fieldsetElements);
    window.address.fill(mainPinElement);

    mainPinElement.addEventListener(`mousedown`, onPageActivate);
    mainPinElement.addEventListener(`keydown`, onPageActivate);
  }

  function onPageActivate(evt) {
    if (evt.button === PRIMARY_MOUSE_BUTTON || evt.key === `Enter`) {
      enableItems(fieldsetElements);
      window.mainPin.move();
      window.address.fill(mainPinElement);
      window.pin.insert();

      mainPinElement.removeEventListener(`mousedown`, onPageActivate);
      mainPinElement.removeEventListener(`keydown`, onPageActivate);
    }
  }

  window.map = {
    deactivatePage
  };
})();
