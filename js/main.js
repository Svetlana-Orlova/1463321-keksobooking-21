'use strict';

(function () {
  const mainPinElement = document.querySelector(`.map__pin--main`);
  const advertFormElement = document.querySelector(`.ad-form`);
  const fieldsetElements = document.querySelectorAll(`fieldset`);

  function mainPinRemoveEventListener() {
    mainPinElement.removeEventListener(`mousedown`, onMouseClickActivatePage);
    mainPinElement.removeEventListener(`keydown`, onEnterPressActivatePage);
  }

  function mainPinAddEventListener() {
    mainPinElement.addEventListener(`mousedown`, onMouseClickActivatePage);
    mainPinElement.addEventListener(`keydown`, onEnterPressActivatePage);
  }

  function onMouseClickActivatePage(evt) {
    window.util.onPrimaryMouseButtonPress(evt, activatePage);
    mainPinRemoveEventListener();
  }

  function onEnterPressActivatePage(evt) {
    window.util.onEnterEvent(evt, activatePage);
    mainPinRemoveEventListener();
  }

  mainPinAddEventListener();

  function deactivatePage() {
    window.map.disable();
    window.form.disableItems(fieldsetElements);
    window.pin.remove();
    window.card.close();
    window.mainPin.restart();
    advertFormElement.classList.add(`ad-form--disabled`);
    mainPinAddEventListener();
  }

  deactivatePage();

  function activatePage() {
    window.map.enable();
    window.form.enableItems(fieldsetElements);
    window.form.checkValidation();
    advertFormElement.classList.remove(`ad-form--disabled`);
    window.server.load(window.pin.insert, window.message.errorHandler);
  }

  window.main = {
    deactivatePage
  };
})();
