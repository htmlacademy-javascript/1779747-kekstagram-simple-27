import {canselButton, closingFormAfterChange, uploadFile, isEnterKey, isEscapeKey, showFormAfterChange} from './form.js';


const uploadPhoto = document.querySelector('.img-upload__start input[type=file]');
const inputUploadPhoto = document.querySelector('.img-upload__preview').getElementsByTagName('img')[0];
const FILE_TYPES = ['jpg', 'jpeg', 'png'];


const uploadPhotoWindow = () => {
  const file = uploadPhoto.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    inputUploadPhoto.src = URL.createObjectURL(file);
  }
};

uploadPhoto.addEventListener('change', () => {
  uploadPhotoWindow();
});

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

export {uploadPhoto, uploadPhotoWindow};
