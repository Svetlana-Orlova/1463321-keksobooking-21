'use strict';

const mainElement = document.querySelector(`main`);
const successMessageTemplateElement = document.querySelector(`#success`).content.querySelector(`.success`);
const errorMessageTemplateElement = document.querySelector(`#error`).content.querySelector(`.error`);
const errorButtonElement = errorMessageTemplateElement.querySelector(`.error__button`);

const errorHandler = (errorMessage) => {
  const node = document.createElement(`div`);

  node.style = `z-index: 100; padding: 10px; margin: 0 auto; color: #fff; font-weight: 500; text-align: center; background-color: #f44336; border-radius: 4px;`;
  node.style.position = `fixed`;
  node.style.top = `5px`;
  node.style.left = `15px`;
  node.style.right = `15px`;
  node.style.fontSize = `30px`;

  node.textContent = errorMessage;

  node.addEventListener(`click`, () => {
    node.remove();
  });
  document.addEventListener(`keydown`, onDocumentEscPress);

  const onDocumentEscPress = (evt) => {
    window.util.onEscPress(evt, node.remove());
  };

  document.body.insertAdjacentElement(`afterbegin`, node);
  window.form.filters.remove();
};

const showErrorMessage = () => {
  mainElement.insertAdjacentElement(`afterbegin`, errorMessageTemplateElement);
  errorButtonElement.addEventListener(`click`, () => {
    errorMessageTemplateElement.remove();
  });
  documentAddEventListener();
};

const showSuccessMessage = () => {
  mainElement.insertAdjacentElement(`afterbegin`, successMessageTemplateElement);
  documentAddEventListener();
};

const closeMessage = () => {
  removeMessage();
  documentRemoveEventListener();
};

const removeMessage = () => {
  const messageSuccess = document.querySelector(`.success`);
  const messageError = document.querySelector(`.error`);
  if (messageSuccess) {
    messageSuccess.remove();
  } else if (messageError) {
    messageError.remove();
  }
};

const onMessageEscPress = (evt) => {
  window.util.onEscPress(evt, closeMessage);
};

const documentAddEventListener = () => {
  document.addEventListener(`keydown`, onMessageEscPress);
  document.addEventListener(`click`, closeMessage);
};

const documentRemoveEventListener = () => {
  document.removeEventListener(`keydown`, onMessageEscPress);
  document.removeEventListener(`click`, closeMessage);
};

window.message = {
  errorHandler,
  error: showErrorMessage,
  success: showSuccessMessage
};
