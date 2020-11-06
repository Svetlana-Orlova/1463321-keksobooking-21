'use strict';

const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;
const MIN_Y = 130;
const MAX_Y = 630;
const PRIMARY_MOUSE_BUTTON = 0;
const ROOMS_NOT_FOR_GUESTS = 100;
const QUANTITY = 8;
const CHECKINS = [`12:00`, `13:00`, `14:00`];
const CHECKOUT = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const mapElement = document.querySelector(`.map`);
const mapWidthElement = document.querySelector(`.map`).clientWidth;
const containerPinTemplateElement = document.querySelector(`.map__pins`);
const filtersContainerElement = mapElement.querySelector(`.map__filters-container`);
const cardTemplateElement = document.querySelector(`#card`).content.querySelector(`.map__card`);
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

  function getRandomItems(array) {
    const newArray = array.slice();
    for (let i = 1; i <= getRandom(0, array.length); i++) {
      const arrayItem = getRandomItem(newArray);
      newArray.splice(newArray.indexOf(arrayItem), 1);
    }
    return newArray;
  }

  let arrayOfAds = [];
  for (let i = 0; i < QUANTITY; i++) {
    let ad = {author: {}, offer: {}, location: {}};
    ad.author.avatar = `img/avatars/user` + `0` + (i + 1) + `.png`;
    ad.offer.title = `Заголовок`;
    ad.offer.address = `${getRandom(0, mapWidthElement) - PIN_WIDTH / 2}, ${getRandom(MIN_Y, MAX_Y) - PIN_HEIGHT}`;
    ad.offer.price = getRandom(500, 50000);
    ad.offer.type = getRandomItem(Object.keys(OFFER_TYPES));
    ad.offer.rooms = getRandom(0, 30);
    ad.offer.guests = getRandom(0, 30);
    ad.offer.checkin = getRandomItem(CHECKINS);
    ad.offer.checkout = getRandomItem(CHECKOUT);
    ad.offer.features = getRandomItems(FEATURES);
    ad.offer.description = `Описание`;
    ad.offer.photos = getRandomItems(PHOTOS);
    ad.location.x = getRandom(0, mapWidthElement);
    ad.location.y = getRandom(MIN_Y, MAX_Y);

    arrayOfAds.push(ad);
  }
  return arrayOfAds;
}

function insertPins() {
  const mapPins = getArrayOfAds();

  function getPins(ads) {
    const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
    const pins = document.createDocumentFragment();

    ads.forEach((ad) => {
      const pin = pinTemplate.cloneNode(true);
      const img = pin.querySelector(`img`);

      pin.style = `left:` + (ad.location.x - PIN_WIDTH / 2) + `px;` + `top:` + (ad.location.y - PIN_HEIGHT) + `px;`;
      img.src = ad.author.avatar;
      img.alt = ad.offer.title;

      pins.append(pin);

      pin.addEventListener(`click`, () => {
        createCard(getCard(ad));
        disablePin();
        pin.classList.add(`map__pin--active`);
      });
    });

    return pins;
  }

  containerPinTemplateElement.append(getPins(mapPins));
}

function getCapacityText(rooms, guests) {
  let result = ``;
  if (rooms === 0) {
    result = `Комнаты `;
  }
  if (rooms % 10 === 1 && rooms % 100 !== 11) {
    result = rooms + ` комната `;
  }
  if (rooms % 10 > 1 && rooms % 10 < 5 && rooms % 100 !== 12 && rooms % 100 !== 13 && rooms % 100 !== 14) {
    result = rooms + ` комнаты `;
  } else {
    result = rooms + ` комнат `;
  }

  if (guests === 0) {
    result += `без гостей`;
  }
  if (guests % 10 === 1 && guests % 100 !== 11) {
    result += `для ` + guests + ` гостя.`;
  } else {
    result += `для ` + guests + ` гостей.`;
  }
  return result;
}

function getCard(ad) {
  let cardElement = cardTemplateElement.cloneNode(true);
  const photoElements = cardElement.querySelector(`.popup__photos`);
  const photoElement = photoElements.querySelector(`.popup__photo`);
  const featureListElement = cardElement.querySelector(`.popup__features`);
  const popupClose = cardElement.querySelector(`.popup__close`);

  cardElement.querySelector(`.popup__title`).textContent = ad.offer.title;
  cardElement.querySelector(`.popup__text--address`).textContent = ad.offer.address;
  cardElement.querySelector(`.popup__text--price`).textContent = ad.offer.price + `₽/ночь`;
  cardElement.querySelector(`.popup__text--capacity`).textContent = getCapacityText(ad.offer.rooms, ad.offer.guests);
  cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ` + ad.offer.checkin + `, выезд до ` + ad.offer.checkout;
  cardElement.querySelector(`.popup__description`).textContent = ad.offer.description;
  cardElement.querySelector(`.popup__avatar`).src = ad.author.avatar;
  cardElement.querySelector(`.popup__type`).textContent = OFFER_TYPES[ad.offer.type].text;

  if (ad.offer.photos) {
    photoElements.innerHTML = ``;
    ad.offer.photos.forEach((photo) => {
      const photoCard = photoElement.cloneNode(true);
      photoCard.src = photo;
      photoElements.append(photoCard);
    });
  } else {
    photoElements.remove();
  }

  if (ad.offer.features) {
    featureListElement.innerHTML = ``;
    ad.offer.features.forEach((feature) => {
      const featureElement = document.createElement(`li`);
      featureElement.classList.add(`popup__feature`, `popup__feature--${feature}`);
      featureListElement.append(featureElement);
    });
  } else {
    featureListElement.remove();
  }

  popupClose.addEventListener(`click`, function () {
    cardElement.remove();
    disablePin();
  });

  return cardElement;
}

function createCard(card) {
  removeCard();
  document.addEventListener(`keydown`, onEscCloseCard);
  mapElement.insertBefore(card, filtersContainerElement);
}

function removeCard() {
  const currentCard = document.querySelector(`.map__card`);
  if (currentCard) {
    currentCard.remove();
    disablePin();
  }
}

function closeCard() {
  removeCard();
  document.removeEventListener(`keydown`, onEscCloseCard);
}

function onEscCloseCard(evt) {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closeCard();
  }
}

function disablePin() {
  const activePinElement = containerPinTemplateElement.querySelector(`.map__pin--active`);
  if (activePinElement) {
    activePinElement.classList.remove(`map__pin--active`);
  }
}

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

function deactivatePage() {
  mapElement.classList.add(`map--faded`);
  advertFormElement.classList.add(`ad-form--disabled`);
  disableItems(fieldsetElements);
  fillAddress(mainPinElement);

  mainPinElement.addEventListener(`mousedown`, onPageActivate);
  mainPinElement.addEventListener(`keydown`, onPageActivate);
}

function onPageActivate(evt) {
  if (evt.button === PRIMARY_MOUSE_BUTTON || evt.key === `Enter`) {
    enableItems(fieldsetElements);
    fillAddress(mainPinElement);
    insertPins();

    mainPinElement.removeEventListener(`mousedown`, onPageActivate);
    mainPinElement.removeEventListener(`keydown`, onPageActivate);
  }
}

deactivatePage();

function checkMinPrice() {
  priceElement.setAttribute(`min`, OFFER_TYPES[typeFieldElement.value].minPrice);
  priceElement.setAttribute(`placeholder`, OFFER_TYPES[typeFieldElement.value].minPrice);
}

checkMinPrice();
typeFieldElement.addEventListener(`input`, checkMinPrice);

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
