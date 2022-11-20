import {publicButton, uploadFile, canselButton,
  showFormAfterChange, closingFormAfterChange, isEnterKey, isEscapeKey, sendPublicPhoto,
  } from './form.js';
import {rendeListPictures, clearListPictures} from './pictureTemplate.js';


rendeListPictures();


uploadFile.addEventListener('change', () => {
  showFormAfterChange();

});

canselButton.addEventListener('click', () => {
  closingFormAfterChange();
});

canselButton.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt) || isEscapeKey(evt)) {
    closingFormAfterChange();
  }
});


publicButton.addEventListener('click', (evt) => {
  if (!sendPublicPhoto()){
    evt.preventDefault();
  }
});



