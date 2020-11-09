'use strict';

(function () {
  const mainPinElement = document.querySelector(`.map__pin--main`);
  const advertFormElement = document.querySelector(`.ad-form`);
  const fieldsetElements = document.querySelectorAll(`fieldset`);

  function mainPinRemoveEventListener() {
    mainPinElement.removeEventListener(`mousedown`, onMouseActivatePage);
    mainPinElement.removeEventListener(`keydown`, onEnterActivatePage);
  }

  function mainPinAddEventListener() {
    mainPinElement.addEventListener(`mousedown`, onMouseActivatePage);
    mainPinElement.addEventListener(`keydown`, onEnterActivatePage);
  }

  function onMouseActivatePage(evt) {
    window.util.isPrimaryMouseButtonPress(evt, activatePage);
    mainPinRemoveEventListener();
  }

  function onEnterActivatePage(evt) {
    window.util.isEnterEvent(evt, activatePage);
    mainPinRemoveEventListener();
  }

  mainPinAddEventListener();

  function deactivatePage() {
    window.map.disable();
    window.form.disableItems(fieldsetElements);
    window.address.fill();
    window.pin.remove();
    window.mainPin.restart();
    advertFormElement.classList.add(`ad-form--disabled`);
    mainPinAddEventListener();
  }

  deactivatePage();

  function activatePage() {
    window.map.enable();
    window.form.enableItems(fieldsetElements);
    window.mainPin.address();
    window.form.checkValidation();
    advertFormElement.classList.remove(`ad-form--disabled`);
    window.server.load(window.pin.insert, window.message.errorHandler);
  }

  window.main = {
    deactivatePage
  };
})();
