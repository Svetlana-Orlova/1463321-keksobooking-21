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
const filtersContainer = map.querySelector(`.map__filters-container`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const photoTemplate = document.querySelector(`#card`).content.querySelector(`.popup__photo`);
const OFFER_TYPES = {
  flat: `Квартира`,
  house: `Дом`,
  palace: `Дворец`,
  bungalow: `Бунгало`
};

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
    ad.offer.rooms = getRandom(0, 10);
    ad.offer.guests = getRandom(1, 100);
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

function insertCard(cardInfo) {

  function createCardImages(photos) {
    let fragment = document.createDocumentFragment();

    for (let i = 0; i < photos.length; i++) {
      let imgTemplate = photoTemplate.cloneNode(true);
      imgTemplate.src = photos[i];
      fragment.appendChild(imgTemplate);
    }
    return fragment;
  }

  function createCard(ad) {
    let cardElement = cardTemplate.cloneNode(true);
    const photoElement = cardElement.querySelector(`.popup__photos`).querySelector(`.popup__photo`);

    cardElement.querySelector(`.popup__photos`).removeChild(photoElement);
    cardElement.querySelector(`.popup__title`).textContent = ad.offer.title;
    cardElement.querySelector(`.popup__text--address`).textContent = ad.offer.address;
    cardElement.querySelector(`.popup__text--price`).textContent = ad.offer.price + `₽/ночь`;
    cardElement.querySelector(`.popup__text--capacity`).textContent = ad.offer.rooms + ` комнаты для ` + ad.offer.guests + ` гостей`;
    cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ` + ad.offer.checkin + `, выезд до ` + ad.offer.checkout;
    cardElement.querySelector(`.popup__features`).textContent = ad.offer.features;
    cardElement.querySelector(`.popup__description`).textContent = ad.offer.description;
    cardElement.querySelector(`.popup__avatar`).src = ad.author.avatar;
    cardElement.querySelector(`.popup__type`).textContent = OFFER_TYPES[ad.offer.type];
    cardElement.querySelector(`.popup__photos`).appendChild(createCardImages(ad.offer.photos));

    return cardElement;
  }
  const card = createCard(cardInfo);
  map.insertBefore(card, filtersContainer);
}

const listOfAds = getArrayOfAds();
insertPins(listOfAds);
insertCard(listOfAds[0]);
map.classList.remove(`map--faded`);
