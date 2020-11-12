'use strict';

const MAIN_PIN_POINTER_HEIGHT = 10;
const mapElement = document.querySelector(`.map`);
const mainPinElement = mapElement.querySelector(`.map__pin--main`);
const mainPinHeight = mainPinElement.offsetHeight + MAIN_PIN_POINTER_HEIGHT;
const mainPinHalfWidth = Math.floor(mainPinElement.offsetWidth / 2);

const MainPinStartCoordinates = {
  X: 375,
  Y: 570,
};

const CoordinateX = {
  MIN: 0,
  MAX: mapElement.offsetWidth
};

const CoordinateY = {
  MIN: 130,
  MAX: 630
};

let mainPinPositionX = {
  min: CoordinateX.MIN - mainPinHalfWidth,
  max: CoordinateX.MAX - mainPinHalfWidth
};

let mainPinPositionY = {
  min: CoordinateY.MIN - mainPinHeight,
  max: CoordinateY.MAX - mainPinHeight
};

const moveMainPin = (evt) => {
  evt.preventDefault();
  let dragged = false;

  let currentCoords = {
    X: evt.clientX,
    Y: evt.clientY
  };

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();
    window.card.close();
    window.pin.disable();
    mainPinElement.removeEventListener(`keydown`, onMainPinEnterPress);
    dragged = true;

    const Shift = {
      X: currentCoords.X - moveEvt.clientX,
      Y: currentCoords.Y - moveEvt.clientY
    };

    currentCoords = {
      X: moveEvt.clientX,
      Y: moveEvt.clientY
    };

    let mainPinY = mainPinElement.offsetTop - Shift.Y;
    let mainPinX = mainPinElement.offsetLeft - Shift.X;

    if (mainPinX <= mainPinPositionX.min) {
      mainPinX = mainPinPositionX.min;
    } else if (mainPinX >= mainPinPositionX.max) {
      mainPinX = mainPinPositionX.max;
    }

    if (mainPinY <= mainPinPositionY.min) {
      mainPinY = mainPinPositionY.min;
    } else if (mainPinY >= mainPinPositionY.max) {
      mainPinY = mainPinPositionY.max;
    }

    mainPinElement.style.top = `${mainPinY}px`;
    mainPinElement.style.left = `${mainPinX}px`;

    window.form.fillAddress(mainPinElement, mainPinHeight);
  };

  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);

    const onClickPreventDefault = (clickEvt) => {
      clickEvt.preventDefault();
      mainPinElement.removeEventListener(`click`, onClickPreventDefault);
    };

    if (dragged === false) {
      mainPinElement.addEventListener(`click`, onClickPreventDefault);
    }

    window.form.fillAddress(mainPinElement, mainPinHeight);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
};

mainPinElement.addEventListener(`mousedown`, moveMainPin);

const resetMainPin = () => {
  mainPinElement.style.top = `${MainPinStartCoordinates.X}px`;
  mainPinElement.style.left = `${MainPinStartCoordinates.Y}px`;
  window.form.fillAddress(mainPinElement, mainPinHeight);
  mainPinElement.addEventListener(`keydown`, onMainPinEnterPress);
};

const onMainPinEnterPress = (evt) => {
  window.util.onEnterPress(evt, window.main.activatePage);
};

window.mainPin = {
  restart: resetMainPin
};
