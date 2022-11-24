import {closingFormAfterChange, setFormSubmit} from './form.js';
import {getData} from './server_data.js';
import './upload_photo.js';
import {rendeListPictures} from'./picture_template.js';


//скачиваю данные о фотографиях
getData((photos) => {
  rendeListPictures(photos);
});

//отправка фото на сервер
setFormSubmit(closingFormAfterChange);
