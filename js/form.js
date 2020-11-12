'use strict';

const ROOMS_NOT_FOR_GUESTS = 100;
const advertFormElement = document.querySelector(`.ad-form`);
const filtersFormElement = document.querySelector(`.map__filters`);
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

const disableItems = (items) => {
  items.forEach((item) => {
    item.setAttribute(`disabled`, true);
  });
};

const enableItems = (items) => {
  items.forEach((item) => {
    item.removeAttribute(`disabled`);
  });
};

const checkMinPrice = () => {
  priceElement.setAttribute(`min`, window.util.offerTypes[typeFieldElement.value].minPrice);
  priceElement.setAttribute(`placeholder`, window.util.offerTypes[typeFieldElement.value].minPrice);
};

const checkValidationCapacity = () => {
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
};

const onCheckInAndCheckOutChange = (evt) => {
  const target = evt.target;

  if (target === checkInFieldElement) {
    checkOutFieldElement.value = checkInFieldElement.value;
  } else if (target === checkOutFieldElement) {
    checkInFieldElement.value = checkOutFieldElement.value;
  }
};

const checkValidation = () => {
  checkMinPrice();
  typeFieldElement.addEventListener(`input`, checkMinPrice);
  checkValidationCapacity();
  roomQuantityElement.addEventListener(`change`, checkValidationCapacity);
  guestQuantityElement.addEventListener(`change`, checkValidationCapacity);
  checkInFieldElement.addEventListener(`change`, onCheckInAndCheckOutChange);
  checkOutFieldElement.addEventListener(`change`, onCheckInAndCheckOutChange);
};

const onSuccess = () => {
  advertFormElement.reset();
  filtersFormElement.reset();
  checkMinPrice();
  window.message.success();
  window.main.deactivatePage();
};

const onError = () => {
  window.message.error();
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  window.server.upload(new FormData(advertFormElement), onSuccess, onError);
  window.scrollTo(0, 0);
};

advertFormElement.addEventListener(`submit`, onFormSubmit);

resetButtonElement.addEventListener(`click`, () => {
  advertFormElement.reset();
  filtersFormElement.reset();
  checkValidation();
  window.main.deactivatePage();
  window.scrollTo(0, 0);
});

const fillAddress = (obj, height) => {
  let addressX = Math.floor(parseInt(obj.style.left, 10) + obj.clientWidth / 2);
  let addressY;
  if (advertFormElement.classList.contains(`ad-form--disabled`)) {
    addressY = (Math.floor(parseInt(obj.style.top, 10) + obj.clientHeight / 2));
  } else {
    addressY = (Math.floor(parseInt(obj.style.top, 10) + height));
  }

  addressInputElement.value = `${addressX}, ${addressY}`;
};

window.form = {
  filters: filtersFormElement,
  checkValidation,
  disableItems,
  enableItems,
  fillAddress
};
