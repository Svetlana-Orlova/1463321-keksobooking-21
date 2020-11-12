'use strict';

const mainPinElement = document.querySelector(`.map__pin--main`);
const advertFormElement = document.querySelector(`.ad-form`);
const fieldsetElements = document.querySelectorAll(`fieldset`);

const mainPinRemoveEventListener = () => {
  mainPinElement.removeEventListener(`mousedown`, onMouseClickActivatePage);
  mainPinElement.removeEventListener(`keydown`, onEnterPressActivatePage);
};

const mainPinAddEventListener = () => {
  mainPinElement.addEventListener(`mousedown`, onMouseClickActivatePage);
  mainPinElement.addEventListener(`keydown`, onEnterPressActivatePage);
};

const onMouseClickActivatePage = (evt) => {
  window.util.onPrimaryMouseButtonPress(evt, activatePage);
  mainPinRemoveEventListener();
};

const onEnterPressActivatePage = (evt) => {
  window.util.onEnterPress(evt, activatePage);
  mainPinRemoveEventListener();
};

mainPinAddEventListener();

const deactivatePage = () => {
  window.map.disable();
  window.form.disableItems(fieldsetElements);
  window.pin.remove();
  window.card.close();
  advertFormElement.classList.add(`ad-form--disabled`);
  window.mainPin.restart();
  mainPinAddEventListener();
  window.photo.resetPreviews();
};

deactivatePage();
window.form.checkValidation();

const activatePage = () => {
  window.map.enable();
  window.form.enableItems(fieldsetElements);
  advertFormElement.classList.remove(`ad-form--disabled`);
  window.pin.update();
};

window.main = {
  deactivatePage,
  activatePage
};
