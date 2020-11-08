'use strict';

(function () {
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const containerPinTemplateElement = document.querySelector(`.map__pins`);

  const PINS_URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;

  function insertPins() {
    function getPins(ads) {
      const pins = document.createDocumentFragment();

      ads.forEach((ad) => {
        const pin = pinTemplate.cloneNode(true);
        const img = pin.querySelector(`img`);

        pin.style = `left:` + (ad.location.x - PIN_WIDTH / 2) + `px;` + `top:` + (ad.location.y - PIN_HEIGHT) + `px;`;
        img.src = ad.author.avatar;
        img.alt = ad.offer.title;

        pins.append(pin);

        pin.addEventListener(`click`, function () {
          window.card.create(window.card.get(ad));
          disablePin();
          pin.classList.add(`map__pin--active`);
          document.addEventListener(`keydown`, onEscDisablePin);
        });
      });

      return pins;
    }

    function onAdsReceived(ads) {
      const pins = getPins(ads);
      containerPinTemplateElement.append(pins);
    }

    window.server.load(PINS_URL, onAdsReceived);
  }

  function disablePin() {
    const activePinElement = containerPinTemplateElement.querySelector(`.map__pin--active`);
    if (activePinElement) {
      activePinElement.classList.remove(`map__pin--active`);
    }
  }

  function onEscDisablePin(evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      disablePin();
    }
  }

  window.pin = {
    disable: disablePin,
    insert: insertPins
  };

})();
