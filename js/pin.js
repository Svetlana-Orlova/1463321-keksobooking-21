'use strict';

(function () {
  const MAX_PINS = 5;
  const pinTemplateElement = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const containerPinTemplateElement = document.querySelector(`.map__pins`);

  function getPin(ad) {
    if (!ad.offer) {
      return;
    }
    const pin = pinTemplateElement.cloneNode(true);
    const img = pin.querySelector(`img`);

    pin.style = `left: ${(ad.location.x - img.width / 2)}px;` + `top: ${ad.location.y - img.height}px;`;
    img.src = ad.author.avatar;
    img.alt = ad.offer.title;

    pin.addEventListener(`click`, function () {
      window.card.create(window.card.get(ad));
      disablePin();
      pin.classList.add(`map__pin--active`);
      document.addEventListener(`keydown`, onEscDisablePin);
    });

    return pin;
  }

  function insertPins(ads) {
    const pins = document.createDocumentFragment();
    let count;

    if (ads.length < MAX_PINS) {
      count = ads.length;
    } else {
      count = MAX_PINS;
    }

    for (let i = 0; i < count; i++) {
      pins.appendChild(getPin(ads[i]));
    }

    document.querySelector(`.map__pins`).appendChild(pins);
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

  function removePins() {
    const pins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    pins.forEach((pin) => {
      pin.remove();
    });
  }

  window.pin = {
    disable: disablePin,
    insert: insertPins,
    remove: removePins
  };

})();
