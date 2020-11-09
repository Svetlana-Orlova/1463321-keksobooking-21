'use strict';

(function () {
  const mainElement = document.querySelector(`main`);
  const successMessageTemplateElement = document.querySelector(`#success`).content.querySelector(`.success`);

  function showErrorMessage() {
    const errorMessageTemplateElement = document.querySelector(`#error`).content.querySelector(`.error`);
    const errorButtonElement = errorMessageTemplateElement.querySelector(`.error__button`);
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
    window.util.onEscPress(evt, closeMessage);
  }

  function onMessageClick() {
    window.util.onDocumentClick(closeMessage);
  }

  function documentAddEventListener() {
    document.addEventListener(`keydown`, onMessageEscPress);
    window.util.onDocumentClick(closeMessage);
  }

  function documentRemoveEventListener() {
    document.removeEventListener(`keydown`, onMessageEscPress);
    document.removeEventListener(`click`, onMessageClick);
  }

  window.message = {
    error: showErrorMessage,
    success: showSuccessMessage
  };

})();
