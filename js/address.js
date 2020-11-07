'use strict';

(function () {
  const MAIN_PIN_POINTER_HEIGHT = 10;
  const mainPinElement = document.querySelector(`.map__pin--main`);
  const advertFormElement = document.querySelector(`.ad-form`);
  const addressInputElement = advertFormElement.querySelector(`#address`);
  const mainPinHeight = mainPinElement.offsetHeight + MAIN_PIN_POINTER_HEIGHT;

  function fillAddress() {
    const addressX = Math.round(parseInt(mainPinElement.style.left, 10) + mainPinElement.clientWidth / 2);
    let addressY;
    if (advertFormElement.classList.contains(`ad-form--disabled`)) {
      addressY = (Math.round(parseInt(mainPinElement.style.top, 10) + mainPinElement.clientHeight / 2));
    } else {
      addressY = (Math.round(parseInt(mainPinElement.style.top, 10) + mainPinHeight));
    }

    addressInputElement.value = `${addressX}, ${addressY}`;
  }

  window.address = {
    fill: fillAddress
  };
})();
