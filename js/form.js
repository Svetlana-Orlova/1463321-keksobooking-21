'use strict';

(function () {
  const ROOMS_NOT_FOR_GUESTS = 100;
  const advertFormElement = document.querySelector(`.ad-form`);
  const roomQuantityElement = advertFormElement.querySelector(`#room_number`);
  const guestQuantityElement = advertFormElement.querySelector(`#capacity`);
  const priceElement = advertFormElement.querySelector(`#price`);
  const typeFieldElement = advertFormElement.querySelector(`#type`);
  const checkInFieldElement = advertFormElement.querySelector(`#timein`);
  const checkOutFieldElement = advertFormElement.querySelector(`#timeout`);

  const OFFER_TYPES = {
    flat: {
      minPrice: `1000`,
      text: `Квартира`
    },
    house: {
      minPrice: `5000`,
      text: `Дом`
    },
    palace: {
      minPrice: `10000`,
      text: `Дворец`
    },
    bungalow: {
      minPrice: `0`,
      text: `Бунгало`
    }
  };

  const roomValidityMessage = {
    1: `1 комната — для 1 гостя`,
    2: `2 комнаты — для 2 гостей или для 1 гостя`,
    3: `3 комнаты — для 3 гостей, или для 2 гостей, или для 1 гостя`,
    100: `100 комнат — не для гостей`
  };

  function checkMinPrice() {
    priceElement.setAttribute(`min`, OFFER_TYPES[typeFieldElement.value].minPrice);
    priceElement.setAttribute(`placeholder`, OFFER_TYPES[typeFieldElement.value].minPrice);
  }

  function checkValidationCapacity() {
    const guests = +guestQuantityElement.value;
    const rooms = +roomQuantityElement.value;
    let result = true;

    if ((rooms === ROOMS_NOT_FOR_GUESTS && guests !== 0) || (rooms !== ROOMS_NOT_FOR_GUESTS && (guests < 1 || guests > rooms))) {
      guestQuantityElement.setCustomValidity(roomValidityMessage[rooms]);
      result = false;
    } else {
      guestQuantityElement.setCustomValidity(``);
    }
    guestQuantityElement.reportValidity();
    return result;
  }

  function onCheckInAndCheckOutChange(evt) {
    const target = evt.target;

    if (target === checkInFieldElement) {
      checkOutFieldElement.value = checkInFieldElement.value;
    } else if (target === checkOutFieldElement) {
      checkInFieldElement.value = checkOutFieldElement.value;
    }
  }

  function checkValidation() {
    checkMinPrice();
    typeFieldElement.addEventListener(`input`, checkMinPrice);
    checkValidationCapacity();
    roomQuantityElement.addEventListener(`change`, checkValidationCapacity);
    guestQuantityElement.addEventListener(`change`, checkValidationCapacity);
    checkInFieldElement.addEventListener(`change`, onCheckInAndCheckOutChange);
    checkOutFieldElement.addEventListener(`change`, onCheckInAndCheckOutChange);
  }

  window.form = {
    checkValidation
  };
})();
