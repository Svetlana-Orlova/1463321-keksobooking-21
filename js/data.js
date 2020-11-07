'use strict';

(function () {
  const QUANTITY = 8;
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;
  const MIN_Y = 130;
  const MAX_Y = 630;
  const CHECKINS = [`12:00`, `13:00`, `14:00`];
  const CHECKOUT = [`12:00`, `13:00`, `14:00`];
  const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
  const mapWidthElement = document.querySelector(`.map`).clientWidth;

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

  function getArrayOfAds() {
    let arrayOfAds = [];
    for (let i = 0; i < QUANTITY; i++) {
      let ad = {author: {}, offer: {}, location: {}};
      ad.author.avatar = `img/avatars/user` + `0` + (i + 1) + `.png`;
      ad.offer.title = `Заголовок`;
      ad.offer.address = `${window.util.getRandom(0, mapWidthElement) - PIN_WIDTH / 2}, ${window.util.getRandom(MIN_Y, MAX_Y) - PIN_HEIGHT}`;
      ad.offer.price = window.util.getRandom(500, 50000);
      ad.offer.type = window.util.getRandomItem(Object.keys(OFFER_TYPES));
      ad.offer.rooms = window.util.getRandom(0, 30);
      ad.offer.guests = window.util.getRandom(0, 30);
      ad.offer.checkin = window.util.getRandomItem(CHECKINS);
      ad.offer.checkout = window.util.getRandomItem(CHECKOUT);
      ad.offer.features = window.util.getRandomItems(FEATURES);
      ad.offer.description = `Описание`;
      ad.offer.photos = window.util.getRandomItems(PHOTOS);
      ad.location.x = window.util.getRandom(0, mapWidthElement);
      ad.location.y = window.util.getRandom(MIN_Y, MAX_Y);

      arrayOfAds.push(ad);
    }
    return arrayOfAds;
  }

  window.data = {
    getArrayOfAds,
    offerTypes: OFFER_TYPES
  };
})();
