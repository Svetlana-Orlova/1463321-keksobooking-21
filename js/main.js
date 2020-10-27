'use strict';

const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;
const MIN_Y = 130;
const MAX_Y = 630;
const QUANTITY = 8;
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const CHECKINS = [`12:00`, `13:00`, `14:00`];
const CHECKOUT = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const map = document.querySelector(`.map`);
const mapWidth = document.querySelector(`.map`).clientWidth;
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const containerPinTemplate = document.querySelector(`.map__pins`);
// const filtersContainer = map.querySelector(`.map__filters-container`); Нужен для карточек, которые мы в этом задании не отрисовываем
// const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
// const photoTemplate = cardTemplate.querySelector(`.popup__photo`); Нужен для карточек, которые мы в этом задании не отрисовываем
const mainPin = map.querySelector(`.map__pin--main`);
const fieldsets = document.querySelectorAll(`fieldset`);
const advertForm = document.querySelector(`.ad-form`);
const addressInput = advertForm.querySelector(`#address`);
const roomQuantity = advertForm.querySelector(`#room_number`);
const guestQuantity = advertForm.querySelector(`#capacity`);
const price = advertForm.querySelector(`#price`);
const typeField = advertForm.querySelector(`#type`);
const checkInField = advertForm.querySelector(`#timein`);
const checkOutField = advertForm.querySelector(`#timeout`);
// const OFFER_TYPES = {
//   flat: `Квартира`,
//   house: `Дом`,
//   palace: `Дворец`,
//   bungalow: `Бунгало`
// }; Нужен для карточек, которые мы в этом задании не отрисовываем

function getArrayOfAds() {
  function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomElement(list) {
    let randomElement = list[Math.floor(Math.random() * list.length)];
    return randomElement;
  }

  let arrayOfAds = [];
  for (let i = 0; i < QUANTITY; i++) {
    let ad = {author: {}, offer: {}, location: {}};
    ad.author.avatar = `img/avatars/user` + `0` + (i + 1) + `.png`;
    ad.offer.title = `Заголовок`;
    ad.offer.address = getRandom(0, mapWidth) + ` , ` + getRandom(MIN_Y, MAX_Y);
    ad.offer.price = getRandom(500, 50000);
    ad.offer.type = getRandomElement(TYPES);
    ad.offer.rooms = getRandom(0, 30);
    ad.offer.guests = getRandom(0, 30);
    ad.offer.checkin = getRandomElement(CHECKINS);
    ad.offer.checkout = getRandomElement(CHECKOUT);
    ad.offer.features = FEATURES.slice(0, getRandom(1, FEATURES.length));
    ad.offer.description = `Описание`;
    ad.offer.photos = PHOTOS.slice(0, getRandom(1, PHOTOS.length));
    ad.location.x = getRandom(0, mapWidth);
    ad.location.y = getRandom(MIN_Y, MAX_Y);

    arrayOfAds.push(ad);
  }
  return arrayOfAds;
}

function insertPins(ads) {
  function createPin(ad) {
    const pinElement = pinTemplate.cloneNode(true);
    pinElement.querySelector(`img`).src = ad.author.avatar;
    pinElement.querySelector(`img`).alt = ad.offer.title;
    pinElement.style = `left:` + (ad.location.x - PIN_WIDTH / 2) + `px;` + `top:` + (ad.location.y - PIN_HEIGHT) + `px;`;
    return pinElement;
  }

  let pins = document.createDocumentFragment();
  for (let i = 0; i < ads.length; i++) {
    const pin = createPin(ads[i]);
    pins.appendChild(pin);
  }
  containerPinTemplate.appendChild(pins);
}

// function insertCard(cardInfo) {

//   function getCardImages(photos) {
//     let fragment = document.createDocumentFragment();

//     photos.forEach(function (photo) {
//       let imgTemplate = photoTemplate.cloneNode(true);
//       imgTemplate.src = photo;
//       fragment.appendChild(imgTemplate);
//     });
//     return fragment;
//   }

//   function getCapacityText(rooms, guests) {
//     let result = ``;
//     if (rooms === 0) {
//       result = `Комнаты `;
//     }
//     if (rooms % 10 === 1 && rooms % 100 !== 11) {
//       result = rooms + ` комната `;
//     }
//     if (rooms % 10 > 1 && rooms % 10 < 5 && rooms % 100 !== 12 && rooms % 100 !== 13 && rooms % 100 !== 14) {
//       result = rooms + ` комнаты `;
//     } else {
//       result = rooms + ` комнат `;
//     }

//     if (guests === 0) {
//       result += `без гостей`;
//     }
//     if (guests % 10 === 1 && guests % 100 !== 11) {
//       result += `для ` + guests + ` гостя.`;
//     } else {
//       result += `для ` + guests + ` гостей.`;
//     }

//     return result;
//   }

//   function createCard(ad) {
//     let cardElement = cardTemplate.cloneNode(true);
//     const photoElement = cardElement.querySelector(`.popup__photos`).querySelector(`.popup__photo`);

//     cardElement.querySelector(`.popup__photos`).removeChild(photoElement);
//     cardElement.querySelector(`.popup__title`).textContent = ad.offer.title;
//     cardElement.querySelector(`.popup__text--address`).textContent = ad.offer.address;
//     cardElement.querySelector(`.popup__text--price`).textContent = ad.offer.price + `₽/ночь`;
//     cardElement.querySelector(`.popup__text--capacity`).textContent = getCapacityText(ad.offer.rooms, ad.offer.guests);
//     cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ` + ad.offer.checkin + `, выезд до ` + ad.offer.checkout;
//     cardElement.querySelector(`.popup__features`).textContent = ad.offer.features;
//     cardElement.querySelector(`.popup__description`).textContent = ad.offer.description;
//     cardElement.querySelector(`.popup__avatar`).src = ad.author.avatar;
//     cardElement.querySelector(`.popup__type`).textContent = OFFER_TYPES[ad.offer.type];
//     cardElement.querySelector(`.popup__photos`).appendChild(getCardImages(ad.offer.photos));

//     return cardElement;
//   }
//   const card = createCard(cardInfo);
//   map.insertBefore(card, filtersContainer);
// }

const listOfAds = getArrayOfAds();

// insertCard(listOfAds[0]); временно отрисовка карточек не нужна

function disabledElement(element) {
  for (let i = 0; i < element.length; i++) {
    element[i].setAttribute(`disabled`, true);
  }
}

function abledElement(element) {
  document.querySelector(`.map`).classList.remove(`map--faded`);
  for (let i = 0; i < element.length; i++) {
    element[i].removeAttribute(`disabled`);
  }
  advertForm.classList.remove(`ad-form--disabled`);
  insertPins(listOfAds);
}

function fillAddress(element) {
  let addressX = element.style.left;
  let addressY = element.style.top;
  if (advertForm.classList.contains(`ad-form--disabled`)) {
    addressInput.value = `${parseInt(addressX, 10) + PIN_WIDTH / 2 }, ${parseInt(addressY, 10) + PIN_HEIGHT / 2}`;
  } else {
    addressInput.value = `${parseInt(addressX, 10) + PIN_WIDTH}, ${parseInt(addressY, 10) + PIN_HEIGHT}`;
  }
}

fillAddress(mainPin);
disabledElement(fieldsets);

mainPin.addEventListener(`mousedown`, function (evt) {
  if (evt.button === 0) {
    abledElement(fieldsets);
    fillAddress(mainPin);
  }
});

mainPin.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    abledElement(fieldsets);
    fillAddress(mainPin);
  }
});

function getMinPrice() {
  if (typeField.value === `bungalow`) {
    price.min = 0;
    price.placeholder = `0`;
  } else if (typeField.value === `flat`) {
    price.min = 1000;
    price.placeholder = `1000`;
  } else if (typeField.value === `house`) {
    price.min = 5000;
    price.placeholder = `5000`;
  } else if (typeField.value === `palace`) {
    price.min = 10000;
    price.placeholder = `10000`;
  }
}

typeField.addEventListener(`input`, getMinPrice);


function checkValidationCapacity() {
  let roomValue = roomQuantity.value;
  let guestValue = guestQuantity.value;
  if (roomValue === `1`) {
    if (guestValue === `1`) {
      guestQuantity.setCustomValidity(``);
    } else {
      guestQuantity.setCustomValidity(`1 комната для 1 гостя`);
    }
  } else if (roomValue === `2`) {
    if (guestValue.value === `1` || guestValue === `2`) {
      guestQuantity.setCustomValidity(``);
    } else {
      guestQuantity.setCustomValidity(`2 комнаты для 2 гостей или для 1 гостя`);
    }
  } else if (roomValue === `3`) {
    if (guestValue === `1` || guestValue === `2` || guestValue === `3`) {
      guestQuantity.setCustomValidity(``);
    } else {
      guestQuantity.setCustomValidity(`3 комнаты для 3 гостей, или для 2 гостей, или для 1 гостя`);
    }
  } else if (roomValue === `100`) {
    if (guestValue === `0`) {
      guestQuantity.setCustomValidity(``);
    } else {
      guestQuantity.setCustomValidity(`100 комнат не для гостей`);
    }
  }
}

checkValidationCapacity();
roomQuantity.addEventListener(`change`, checkValidationCapacity);
guestQuantity.addEventListener(`change`, checkValidationCapacity);

function setCheckInAndCheckOut(evt) {
  const target = evt.target;
  let connectedSelect;

  if (target === checkInField) {
    connectedSelect = checkOutField;
  } else {
    connectedSelect = checkInField;
  }

  switch (target.value) {
    case `12:00`:
      connectedSelect.value = `12:00`;
      break;
    case `13:00`:
      connectedSelect.value = `13:00`;
      break;
    case `14:00`:
      connectedSelect.value = `14:00`;
      break;
  }
}

checkInField.addEventListener(`change`, setCheckInAndCheckOut);
checkOutField.addEventListener(`change`, setCheckInAndCheckOut);
