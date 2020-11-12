'use strict';

const LOAD_URL = `https://21.javascript.pages.academy/keksobooking/data`;
const UPLOAD_URL = ` https://21.javascript.pages.academy/keksobooking`;
const TIMEOUT = 4000;

const query = (method, url, data, onSuccess, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    let error;
    switch (xhr.status) {
      case 200:
        onSuccess(xhr.response);
        break;
      case 400:
        error = `Неверный запрос`;
        break;
      case 401:
        error = `Пользователь не авторизован`;
        break;
      case 404:
        error = `Ничего не найдено`;
        break;
      default:
        error = `Cтатус ответа: ${xhr.status} ${xhr.statusText}`;
    }

    if (error) {
      onError(error);
    }
  });

  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });

  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
  });

  xhr.timeout = TIMEOUT;
  xhr.open(method, url);
  if (data) {
    xhr.send(data);
  } else {
    xhr.send();
  }
};

const loadData = (cbSuccess, cbError) => {
  query(`GET`, LOAD_URL, null, cbSuccess, cbError);
};

const uploadData = (data, cbSuccess, cbError) => {
  query(`POST`, UPLOAD_URL, data, cbSuccess, cbError);
};

window.server = {
  load: loadData,
  upload: uploadData
};
