
'use strict';
(function () {
  const MAIN_PIN_POINTER_HEIGHT = 10;
  const mapElement = document.querySelector(`.map`);
  const mainPinElement = mapElement.querySelector(`.map__pin--main`);
  const advertFormElement = document.querySelector(`.ad-form`);
  const addressInputElement = advertFormElement.querySelector(`#address`);
  const mainPinHeight = mainPinElement.offsetHeight + MAIN_PIN_POINTER_HEIGHT;
  const mainPinHalfWidth = Math.floor(mainPinElement.offsetWidth / 2);

  const CoordinateX = {
    MIN: 0,
    MAX: mapElement.offsetWidth
  };

  const CoordinateY = {
    MIN: 130,
    MAX: 630
  };

  function getCoordinates() {
    let MainPinPositionX = {
      MIN: CoordinateX.MIN - mainPinHalfWidth,
      MAX: CoordinateX.MAX - mainPinHalfWidth
    };

    let MainPinPositionY = {
      MIN: CoordinateY.MIN - mainPinHeight,
      MAX: CoordinateY.MAX - mainPinHeight
    };

    mainPinElement.addEventListener(`mousedown`, function (evt) {
      evt.preventDefault();

      let StartCoords = {
        X: evt.clientX,
        Y: evt.clientY
      };

      function onMouseMove(moveEvt) {
        moveEvt.preventDefault();

        const Shift = {
          X: StartCoords.X - moveEvt.clientX,
          Y: StartCoords.Y - moveEvt.clientY
        };

        StartCoords = {
          X: moveEvt.clientX,
          Y: moveEvt.clientY
        };

        let mainPinY = mainPinElement.offsetTop - Shift.Y;
        let mainPinX = mainPinElement.offsetLeft - Shift.X;

        if (mainPinY <= MainPinPositionY.MIN) {
          mainPinY = MainPinPositionY.MIN;
        } else if (mainPinY >= MainPinPositionY.MAX) {
          mainPinY = MainPinPositionY.MAX;
        }

        if (mainPinX <= MainPinPositionX.MIN) {
          mainPinX = MainPinPositionX.MIN;
        } else if (mainPinX >= MainPinPositionX.MAX) {
          mainPinX = MainPinPositionX.MAX;
        }

        mainPinElement.style.top = `${mainPinY}px`;
        mainPinElement.style.left = `${mainPinX}px`;

        addressInputElement.value = `${mainPinX + mainPinHalfWidth}, ${mainPinY + mainPinHeight}`;
      }

      function onMouseUp(upEvt) {
        upEvt.preventDefault();

        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);
      }

      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
    });
  }

  window.mainPin = {
    move: getCoordinates
  };
})();
