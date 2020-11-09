'use strict';

(function () {
  const mainElement = document.querySelector(`main`);
  const errorMessageTemplateElement = document.querySelector(`#error`).content.querySelector(`.error`);
  const errorButtonElement = errorMessageTemplateElement.querySelector(`.error__button`);
  const successMessageTemplateElement = document.querySelector(`#success`).content.querySelector(`.success`);

  function errorHandler(errorMessage) {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `fixed`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `24px`;
    node.style.color = `black`;
    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  }

  function showErrorMessage() {
    mainElement.insertAdjacentElement(`afterbegin`, errorMessageTemplateElement);
    errorButtonElement.addEventListener(`click`, function () {
      errorMessageTemplateElement.remove();
    });
    documentAddEventListener();
  }

  function showSuccessMessage() {
    mainElement.insertAdjacentElement(`afterbegin`, successMessageTemplateElement);
    documentAddEventListener();
  }

  function closeMessage() {
    removeMessage();
    documentRemoveEventListener();
  }

  function removeMessage() {
    const messageSuccess = document.querySelector(`.success`);
    const messageError = document.querySelector(`.error`);
    if (messageSuccess) {
      messageSuccess.remove();
    } else if (messageError) {
      messageError.remove();
    }
  }

  function onMessageEscPress(evt) {
    window.util.isEscPress(evt, closeMessage);
  }

  function onMessageClick() {
    window.util.isDocumentClick(closeMessage);
  }

  function documentAddEventListener() {
    document.addEventListener(`keydown`, onMessageEscPress);
    window.util.isDocumentClick(closeMessage);
  }

  function documentRemoveEventListener() {
    document.removeEventListener(`keydown`, onMessageEscPress);
    document.removeEventListener(`click`, onMessageClick);
  }

  window.message = {
    errorHandler,
    error: showErrorMessage,
    success: showSuccessMessage
  };

})();