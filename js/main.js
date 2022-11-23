import {closingFormAfterChange, setFormSubmit} from './form.js';
import {getData} from './serverData.js';
import './uploadPhoto.js';
import {rendeListPictures} from'./pictureTemplate.js';


//скачиваю данные о фотографиях
getData((photos) => {
  rendeListPictures(photos);
});

//отправка фото на сервер
setFormSubmit(closingFormAfterChange);
