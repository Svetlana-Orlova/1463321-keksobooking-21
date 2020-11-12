'use strict';

const PRIMARY_MOUSE_BUTTON = 0;

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

const onPrimaryMouseButtonPress = (evt, action) => {
  if (evt.button === PRIMARY_MOUSE_BUTTON) {
    action();
  }
};

const onEscPress = (evt, action) => {
  if (evt.key === `Escape`) {
    action();
  }
};

const onEnterPress = (evt, action) => {
  if (evt.key === `Enter`) {
    action();
  }
};

window.util = {
  offerTypes: OFFER_TYPES,
  onPrimaryMouseButtonPress,
  onEscPress,
  onEnterPress
};
