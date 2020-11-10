'use strict';

(function () {
  const ADS_NUMBER = 5;
  const ANY = `any`;
  const filtersElement = document.querySelector(`.map__filters`);
  const typeElement = filtersElement.querySelector(`#housing-type`);
  const priceElement = filtersElement.querySelector(`#housing-price`);
  const roomsElement = filtersElement.querySelector(`#housing-rooms`);
  const guestsElement = filtersElement.querySelector(`#housing-guests`);
  const featuresElement = filtersElement.querySelector(`#housing-features`);
  const fieldsetElements = document.querySelectorAll(`fieldset`);

  const Prices = {
    MIN: 10000,
    MAX: 50000
  };

  function setPrice(element) {
    switch (priceElement.value) {
      case ANY:
        return true;
      case `low`:
        return (element.offer.price < Prices.MIN);
      case `middle`:
        return (element.offer.price >= Prices.MIN) && (element.offer.price < Prices.MAX);
      case `high`:
        return (element.offer.price >= Prices.MAX);
      default:
        return element === priceElement.value;
    }
  }

  function neededFeatures() {
    return Array.from(featuresElement.querySelectorAll(`input:checked`)).map(function (item) {
      return item.value;
    });
  }

  function getVerification(offers) {

    return offers.filter(function (element) {
      let isTypeMatched = typeElement.value === ANY ? true : element.offer.type === typeElement.value;
      let isRoomsMatched = roomsElement.value === ANY ? true : element.offer.rooms === +roomsElement.value;
      let isGuestMatched = guestsElement.value === ANY ? true : element.offer.guests === +guestsElement.value;
      let isPriceMatched = setPrice(element);
      let isFeaturesMatched = neededFeatures().every(function (feature) {
        return element.offer.features.includes(feature);
      });
      return !!(isTypeMatched && isRoomsMatched && isGuestMatched && isPriceMatched && isFeaturesMatched);
    }).slice(0, ADS_NUMBER);
  }

  let ads = [];

  function successLoadHandler(jsonData) {
    ads = jsonData;

    if (jsonData.length > 0) {
      window.form.enableItems(fieldsetElements);
    }

    updatePins();
  }

  function showMapPins() {
    window.server.load(successLoadHandler, window.message.error);
  }

  function updatePins() {
    window.pin.remove();
    window.card.close();

    const filteredAds = getVerification(ads);

    window.pin.insert(filteredAds);
  }

  filtersElement.addEventListener(`change`, window.debounce(updatePins));

  window.filter = {
    showMapPins
  };

})();
