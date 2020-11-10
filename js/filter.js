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
        return (element.offer.price > Prices.MIN) && (element.offer.price < Prices.MAX);
      case `high`:
        return (element.offer.price > Prices.MAX);
      default:
        return element === priceElement.value;
    }
  }

  let offers = [];

  function neededFeatures() {
    return Array.from(featuresElement.querySelectorAll(`input:checked`)).map(function (item) { /* Сначала Будет создана коллекция/псевдомассив из выбранных значений featuresElement далее с помощью array.from он будет преобразован в реальный массив состоящий из выбранных значений и уже с помощью map будет создан новый массив который будет состоять из значений выбранных элементов */
      return item.value;
    });
  }

  function getVerification(dataArray) {
    offers = dataArray;

    return dataArray.filter(function (element) {
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

  function onFilterChange() {
    window.debounce(function () {
      window.card.close();
      window.pin.insert(getVerification(offers));
    });
  }

  filtersElement.addEventListener(`change`, onFilterChange);

  window.filter = {
    getVerification
  };
})();


