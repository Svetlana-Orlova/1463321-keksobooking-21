
'use strict';
(function () {
  const MAIN_PIN_POINTER_HEIGHT = 10;
  const mapElement = document.querySelector(`.map`);
  const mainPinElement = mapElement.querySelector(`.map__pin--main`);
  const mainPinHeight = mainPinElement.offsetHeight + MAIN_PIN_POINTER_HEIGHT;
  const mainPinHalfWidth = Math.floor(mainPinElement.offsetWidth / 2);

  const MainPinStartСoordinates = {
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

  function moveMainPin(evt) {
    evt.preventDefault();
    let dragged = false;

    let currentCoords = {
      X: evt.clientX,
      Y: evt.clientY
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      window.card.close();
      window.pin.disable();
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
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      function onClickPreventDefault(clickEvt) {
        clickEvt.preventDefault();
        mainPinElement.removeEventListener(`click`, onClickPreventDefault);
      }

      if (dragged) {
        mainPinElement.addEventListener(`click`, onClickPreventDefault);
      }
    }

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  }

  mainPinElement.addEventListener(`mousedown`, moveMainPin);

  function resetMainPin() {
    mainPinElement.style.top = `${MainPinStartСoordinates.X}px`;
    mainPinElement.style.left = `${MainPinStartСoordinates.Y}px`;
    window.form.fillAddress(mainPinElement, mainPinHeight);
  }

  window.mainPin = {
    restart: resetMainPin
  };
})();
