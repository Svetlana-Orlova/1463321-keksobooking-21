'use strict';

(function () {
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;
  const PRIMARY_MOUSE_BUTTON = 0;
  const mapElement = document.querySelector(`.map`);
  const mainPinElement = mapElement.querySelector(`.map__pin--main`);
  const fieldsetElements = document.querySelectorAll(`fieldset`);
  const advertFormElement = document.querySelector(`.ad-form`);
  const addressInputElement = advertFormElement.querySelector(`#address`);

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

  function fillAddress(item) {
    const addressX = item.style.left;
    const addressY = item.style.top;
    if (advertFormElement.classList.contains(`ad-form--disabled`)) {
      addressInputElement.value = `${parseInt(addressX, 10) + PIN_WIDTH / 2 }, ${parseInt(addressY, 10) + PIN_HEIGHT / 2}`;
    } else {
      addressInputElement.value = `${parseInt(addressX, 10) + PIN_WIDTH}, ${parseInt(addressY, 10) + PIN_HEIGHT}`;
    }
  }

  function deactivatePage() {
    mapElement.classList.add(`map--faded`);
    advertFormElement.classList.add(`ad-form--disabled`);
    disableItems(fieldsetElements);
    fillAddress(mainPinElement);

    mainPinElement.addEventListener(`mousedown`, onPageActivate);
    mainPinElement.addEventListener(`keydown`, onPageActivate);
  }

  function onPageActivate(evt) {
    if (evt.button === PRIMARY_MOUSE_BUTTON || evt.key === `Enter`) {
      enableItems(fieldsetElements);
      fillAddress(mainPinElement);
      window.pin.insertPins();

      mainPinElement.removeEventListener(`mousedown`, onPageActivate);
      mainPinElement.removeEventListener(`keydown`, onPageActivate);
    }
  }

  window.map = {
    deactivatePage
  };
})();
