'use strict';

const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;
const MIN_Y = 130;
const MAX_Y = 630;
const PRIMARY_MOUSE_BUTTON = 0;
const ROOMS_NOT_FOR_GUESTS = 100;
const QUANTITY = 8;
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const CHECKINS = [`12:00`, `13:00`, `14:00`];
const CHECKOUT = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const mapElement = document.querySelector(`.map`);
const mapWidthElement = document.querySelector(`.map`).clientWidth;
const pinTemplateElement = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const containerPinTemplateElement = document.querySelector(`.map__pins`);
// const filtersContainerElement = mapElement.querySelector(`.map__filters-container`); Нужен для карточек, которые мы в этом задании не отрисовываем
// const cardTemplateElement = document.querySelector(`#card`).content.querySelector(`.map__card`);
// const photoTemplateElement = cardTemplateElement.querySelector(`.popup__photo`); Нужен для карточек, которые мы в этом задании не отрисовываем
const mainPinElement = mapElement.querySelector(`.map__pin--main`);
const fieldsetElements = document.querySelectorAll(`fieldset`);
const advertFormElement = document.querySelector(`.ad-form`);
const addressInputElement = advertFormElement.querySelector(`#address`);
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

function getArrayOfAds() {
  function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomItem(list) {
    let randomItem = list[Math.floor(Math.random() * list.length)];
    return randomItem;
  }

  let arrayOfAds = [];
  for (let i = 0; i < QUANTITY; i++) {
    let ad = {author: {}, offer: {}, location: {}};
    ad.author.avatar = `img/avatars/user` + `0` + (i + 1) + `.png`;
    ad.offer.title = `Заголовок`;
    ad.offer.address = getRandom(0, mapWidthElement) + ` , ` + getRandom(MIN_Y, MAX_Y);
    ad.offer.price = getRandom(500, 50000);
    ad.offer.type = getRandomItem(TYPES);
    ad.offer.rooms = getRandom(0, 30);
    ad.offer.guests = getRandom(0, 30);
    ad.offer.checkin = getRandomItem(CHECKINS);
    ad.offer.checkout = getRandomItem(CHECKOUT);
    ad.offer.features = FEATURES.slice(0, getRandom(1, FEATURES.length));
    ad.offer.description = `Описание`;
    ad.offer.photos = PHOTOS.slice(0, getRandom(1, PHOTOS.length));
    ad.location.x = getRandom(0, mapWidthElement);
    ad.location.y = getRandom(MIN_Y, MAX_Y);

    arrayOfAds.push(ad);
  }
  return arrayOfAds;
}

function insertPins(ads) {
  function createPin(ad) {
    const pinElement = pinTemplateElement.cloneNode(true);
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
  containerPinTemplateElement.appendChild(pins);
}

// function insertCard(cardInfo) {

//   function getCardImages(photos) {
//     let fragment = document.createDocumentFragment();

//     photos.forEach(function (photo) {
//       let imgTemplate = photoTemplateElement.cloneNode(true);
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
//     let cardElement = cardTemplateElement.cloneNode(true);
//     const photoElement = cardElement.querySelector(`.popup__photo`);

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
//   mapElement.insertBefore(card, filtersContainerElement);
// }

const listOfAds = getArrayOfAds();

// insertCard(listOfAds[0]); временно отрисовка карточек не нужна

function disableItems(items) {
  for (let i = 0; i < items.length; i++) {
    items[i].setAttribute(`disabled`, true);
  }
}

function enableItems(items) {
  mapElement.classList.remove(`map--faded`);
  for (let i = 0; i < items.length; i++) {
    items[i].removeAttribute(`disabled`);
  }
  advertFormElement.classList.remove(`ad-form--disabled`);
  insertPins(listOfAds);
}

function fillAddress(item) {
  const addressX = item.style.left;
  const addressY = item.style.top;
  if (advertFormElement.classList.contains(`ad-form--disabled`)) {
    addressInputElement.value = `${parseInt(addressX, 10) + PIN_WIDTH / 2 }, ${parseInt(addressY, 10) + PIN_HEIGHT / 2}`;
  } else {
    addressInputElement.value = `${parseInt(addressX, 10) + PIN_WIDTH}, ${parseInt(addressY, 10) + PIN_HEIGHT}`;
  }
}

fillAddress(mainPinElement);
disableItems(fieldsetElements);

function onPageActivate(evt) {
  if (evt.button === PRIMARY_MOUSE_BUTTON || evt.key === `Enter`) {
    enableItems(fieldsetElements);
    fillAddress(mainPinElement);
  }
}

mainPinElement.addEventListener(`mousedown`, onPageActivate);
mainPinElement.addEventListener(`keydown`, onPageActivate);

function checkMinPrice() {
  priceElement.setAttribute(`min`, OFFER_TYPES[typeFieldElement.value].minPrice);
  priceElement.setAttribute(`placeholder`, OFFER_TYPES[typeFieldElement.value].minPrice);
}

checkMinPrice();
typeFieldElement.addEventListener(`input`, checkMinPrice);

function checkValidationCapacity() {
  const guests = guestQuantityElement.value;
  const rooms = roomQuantityElement.value;

  if ((rooms === ROOMS_NOT_FOR_GUESTS && guests !== 0) || (rooms !== ROOMS_NOT_FOR_GUESTS && (guests < 1 || guests > rooms))) {
    guestQuantityElement.setCustomValidity(roomValidityMessage[rooms]);
  } else {
    guestQuantityElement.setCustomValidity(``);
  }
  guestQuantityElement.reportValidity();
}

checkValidationCapacity();
roomQuantityElement.addEventListener(`change`, checkValidationCapacity);
guestQuantityElement.addEventListener(`change`, checkValidationCapacity);

function onCheckInAndCheckOutChange(evt) {
  const target = evt.target;

  if (target === checkInFieldElement) {
    checkOutFieldElement.value = checkInFieldElement.value;
  } else if (target === checkOutFieldElement) {
    checkInFieldElement.value = checkOutFieldElement.value;
  }
}

checkInFieldElement.addEventListener(`change`, onCheckInAndCheckOutChange);
checkOutFieldElement.addEventListener(`change`, onCheckInAndCheckOutChange);
