'use strict';

(function () {
  const mapElement = document.querySelector(`.map`);
  const cardTemplateElement = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const filtersContainerElement = mapElement.querySelector(`.map__filters-container`);

  function getCapacityText(rooms, guests) {
    let result = ``;
    if (rooms === 0) {
      result = `Помещение `;
    } else if (rooms % 10 === 1 && rooms % 100 !== 11) {
      result = rooms + ` комната `;
    } else if (rooms % 10 > 1 && rooms % 10 < 5 && rooms % 100 !== 12 && rooms % 100 !== 13 && rooms % 100 !== 14) {
      result = rooms + ` комнаты `;
    } else {
      result = rooms + ` комнат `;
    }

    if (guests === 0) {
      result += `без гостей`;
    } else if (guests % 10 === 1 && guests % 100 !== 11) {
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
    cardElement.querySelector(`.popup__type`).textContent = window.util.offerTypes[ad.offer.type].text;

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
      window.pin.disable();
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

  window.card = {
    get: getCard,
    create: createCard,
    close: closeCard
  };
})();
