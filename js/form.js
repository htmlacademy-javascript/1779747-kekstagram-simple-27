import {clearListPictures, rendeListPictures} from './pictureTemplate.js';
import {imgPreview, noneEffectData, replaceClass, changeSlider} from './imageEffect.js';

const uploadFile = document.getElementById('upload-file');
const showForm = document.querySelector('.img-upload__overlay');
const canselButton = document.getElementById('upload-cancel');
const uploadForm = document.querySelector('.img-upload__form');
const publicButton = document.getElementById('upload-submit');
const textDescription = document.querySelector('.text__description');
const scaleControlValue = document.querySelector('.scale__control--value');



let size =1;

const isEscapeKey = (evt) => evt.key === 'Escape';
const isEnterKey = (evt) => evt.key === 'Enter';

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closingFormAfterChange();
  }
};

const showFormAfterChange = () => {
  textDescription.textContent = '';
  showForm.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
  scaleControlValue.value = '100%';
  imgPreview.style.transform = 'scale(1)';
  size = 1;
  replaceClass('effects__preview--none');
  noneEffectData();
  changeSlider();
};

const closingFormAfterChange = () => {
  //clearListPictures ();
  showForm.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
 // uploadForm.reset();
  //imgPreview.style.transform = 'scale(1)';
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'img-upload__text__error-text',
});

const blockSubmitButton = () => {
  publicButton.disabled = true;
  publicButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  publicButton.disabled = false;
  publicButton.textContent = 'Отправить';
};
const sendPublicPhoto = () => {

    const  isValid = pristine.validate();
    if(isValid) {
      blockSubmitButton();
     // sendData()
      closingFormAfterChange();
      unblockSubmitButton();
      return true;

    } else
     return false;
};

const changeOfSize = (scaleButton) => {
  if(scaleButton && size > 0.25 ){
    size = size - 0.25;
    scaleControlValue.value = size * 100 + '%';
    imgPreview.style.transform = `scale(${size})`;
  }
  if (!scaleButton && size < 1){
    size = size + 0.25;
    scaleControlValue.value = size * 100 + '%';
    imgPreview.style.transform = `scale(${size})`;
  }
};
export {scaleControlValue, publicButton, uploadFile, canselButton, isEnterKey, isEscapeKey,
  onPopupEscKeydown, showFormAfterChange, closingFormAfterChange, sendPublicPhoto, changeOfSize };

