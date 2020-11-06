'use strict';

(function () {
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const containerPinTemplateElement = document.querySelector(`.map__pins`);
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;

  function insertPins() {
    const mapPins = window.data.getArrayOfAds;

    function getPins(ads) {
      const pins = document.createDocumentFragment();

      ads.forEach((ad) => {
        const pin = pinTemplate.cloneNode(true);
        const img = pin.querySelector(`img`);

        pin.style = `left:` + (ad.location.x - PIN_WIDTH / 2) + `px;` + `top:` + (ad.location.y - PIN_HEIGHT) + `px;`;
        img.src = ad.author.avatar;
        img.alt = ad.offer.title;

        pins.append(pin);

        pin.addEventListener(`click`, () => {
          window.card.createCard(window.card.getCard(ad));
          disablePin();
          pin.classList.add(`map__pin--active`);
        });
      });

      return pins;
    }
    containerPinTemplateElement.append(getPins(mapPins));
  }

  function disablePin() {
    const activePinElement = containerPinTemplateElement.querySelector(`.map__pin--active`);
    if (activePinElement) {
      activePinElement.classList.remove(`map__pin--active`);
    }
  }

  window.pin = {
    disablePin,
    insertPins
  };

})();
