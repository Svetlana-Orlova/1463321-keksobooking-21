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
const mapPinTemplate = document.querySelector(`.map__pins`);

function getArrayOfAds() {
  function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  let arrayOfAds = [];
  for (let i = 0; i < QUANTITY; i++) {
    let ad = {author: {}, offer: {}, location: {}};
    ad.author.avatar = `img/avatars/user` + `0` + (i + 1) + `.png`;
    ad.offer.title = `Заголовок`;
    ad.offer.adress = getRandom(0, mapWidth) + ` , ` + getRandom(MIN_Y, MAX_Y);
    ad.offer.price = `350`;
    ad.offer.type = TYPES[Math.floor(Math.random() * TYPES.length)];
    ad.offer.rooms = 2;
    ad.offer.guests = 3;
    ad.offer.checkin = CHECKINS[Math.floor(Math.random() * CHECKINS.length)];
    ad.offer.checkout = CHECKOUT[Math.floor(Math.random() * CHECKOUT.length)];
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
  mapPinTemplate.appendChild(pins);
}

const arrayOfAds = getArrayOfAds();
insertPins(arrayOfAds);
map.classList.remove(`map--faded`);
