'use strict';

(function () {
  const ROOMS_NOT_FOR_GUESTS = 100;
  const advertFormElement = document.querySelector(`.ad-form`);
  const addressInputElement = advertFormElement.querySelector(`#address`);
  const roomQuantityElement = advertFormElement.querySelector(`#room_number`);
  const guestQuantityElement = advertFormElement.querySelector(`#capacity`);
  const priceElement = advertFormElement.querySelector(`#price`);
  const typeFieldElement = advertFormElement.querySelector(`#type`);
  const checkInFieldElement = advertFormElement.querySelector(`#timein`);
  const checkOutFieldElement = advertFormElement.querySelector(`#timeout`);
  const resetButtonElement = advertFormElement.querySelector(`.ad-form__reset`);

  const roomValidityMessage = {
    1: `1 комната — для 1 гостя`,
    2: `2 комнаты — для 2 гостей или для 1 гостя`,
    3: `3 комнаты — для 3 гостей, или для 2 гостей, или для 1 гостя`,
    100: `100 комнат — не для гостей`
  };

  function disableItems(items) {
    items.forEach((item) => {
      item.setAttribute(`disabled`, true);
    });
  }

  function enableItems(items) {
    items.forEach((item) => {
      item.removeAttribute(`disabled`);
    });
  }

  function checkMinPrice() {
    priceElement.setAttribute(`min`, window.util.offerTypes[typeFieldElement.value].minPrice);
    priceElement.setAttribute(`placeholder`, window.util.offerTypes[typeFieldElement.value].minPrice);
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

  function onSuccess() {
    advertFormElement.reset();
    checkMinPrice();
    window.message.success();
    window.main.deactivatePage();
  }

  function onError() {
    window.message.error();
  }

  function onFormSubmit(evt) {
    evt.preventDefault();
    window.server.upload(new FormData(advertFormElement), onSuccess, onError);
  }

  advertFormElement.addEventListener(`submit`, onFormSubmit);

  resetButtonElement.addEventListener(`click`, function () {
    advertFormElement.reset();
    checkValidation();
    window.main.deactivatePage();
  });

  function fillAddress(obj, height) {
    let addressX = Math.floor(parseInt(obj.style.left, 10) + obj.clientWidth / 2);
    let addressY;
    if (advertFormElement.classList.contains(`ad-form--disabled`)) {
      addressY = (Math.floor(parseInt(obj.style.top, 10) + obj.clientHeight / 2));
    } else {
      addressY = (Math.floor(parseInt(obj.style.top, 10) + height));
    }

    addressInputElement.value = `${addressX}, ${addressY}`;
  }

  window.form = {
    checkValidation,
    disableItems,
    enableItems,
    fillAddress
  };
})();
