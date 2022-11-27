import {showAlert} from './util.js';

const SEND_URL_ADRESS = 'https://27.javascript.pages.academy/kekstagram-simple';
//const GET_URL_ADRESS = 'https://27.javascript.pages.academy/kekstagram-simple/data';
const GET_URL_ADRESS = `${SEND_URL_ADRESS}/data`;
//console.log(GET_URL_ADRESS);
//функция отправки фото на сервер
const sendData = (onSuccess, onFail, body) => {
  fetch(
    SEND_URL_ADRESS,
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
  fetch(GET_URL_ADRESS)
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
