import {showAlert} from './util.js';

//функция отправки фото на сервер
const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://27.javascript.pages.academy/kekstagram-simple',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте еще раз.');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте еще раз.');
    });
};


//функциия получение данных по миниатюрам
const getData = (onSuccess) => {
  fetch('https://27.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .then((photo) => {
      onSuccess(photo);
    })
    .catch(() => {
      showAlert ('Не удалось загрузить фото. Попробуйте ещё раз');
    });
};


export {getData, sendData};
