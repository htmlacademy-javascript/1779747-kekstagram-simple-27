import {imgPreview, noneEffectData, replaceClass, changeSlider} from './imageEffect.js';
import {isEnterKey, isEscapeKey, showAlert} from './util.js';
import {sendData} from './serverData.js';


const uploadFile = document.getElementById('upload-file');
const showForm = document.querySelector('.img-upload__overlay');
const canselButton = document.getElementById('upload-cancel');
const uploadForm = document.querySelector('.img-upload__form');
const publicButton = document.getElementById('upload-submit');
const textDescription = document.querySelector('.text__description');
const scaleControlValue = document.querySelector('.scale__control--value');
const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const successButton = document.querySelector('#success').content.querySelector('.success__button');
const errorButton = document.querySelector('#error').content.querySelector('.error__button');
let templateMessage = undefined;
let sizeWindow = 1;

const resetForm = () => {
  scaleControlValue.value = '100%';
  imgPreview.style.transform = 'scale(1)';
  sizeWindow = 1;
  replaceClass('effects__preview--none');
};

const showFormAfterChange = () => {
  textDescription.textContent = '';
  showForm.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
  resetForm();
  noneEffectData();
  changeSlider();
};

const closingFormAfterChange = () => {
  showForm.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  uploadForm.reset();
  resetForm();
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

const changeOfSize = (scaleButton) => {
  if(scaleButton && sizeWindow > 0.25 ){
    sizeWindow = sizeWindow - 0.25;
    scaleControlValue.value = (sizeWindow * 100) + '%';
    imgPreview.style.transform = `scale(${sizeWindow})`;
  }
  if (!scaleButton && sizeWindow < 1){
    sizeWindow = sizeWindow + 0.25;
    scaleControlValue.value = (sizeWindow * 100) + '%';
    imgPreview.style.transform = `scale(${sizeWindow})`;
  }
};

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closingFormAfterChange();
  }
};

const hideWindowMessage = (event) => {
  templateMessage.remove();
  document.removeEventListener('keydown', escOnMessage);
  document.removeEventListener('click', clickOnMessage);
  if (event === 'success__button') {
    successButton.removeEventListener('click', clickButtonOnMessage);
  } else {
    errorButton.removeEventListener('click', clickButtonOnMessage);
  }
};

const escOnMessage = (evt) => {
  if (isEscapeKey(evt)) {
    hideWindowMessage(evt.target.className);
  }
};
const clickOnMessage = (evt) => {
  if (evt.target.className !== 'success__inner' && evt.target.className !== 'success__title' &&
    evt.target.className !== 'error__inner' && evt.target.className !== 'error__title') {
    hideWindowMessage(evt.target.className);
  }
};

const clickButtonOnMessage = (evt) => {
  if (evt.target.className === 'success__button' ) {
    hideWindowMessage(evt.target.className);
  }
};



const showAlertMessage = (message, viewMessage) => {
  templateMessage = message.cloneNode(true);
  document.querySelector('body').append(templateMessage);
  document.addEventListener('keydown', escOnMessage);
  document.addEventListener('click', clickOnMessage);
  if (event === 'success__button') {
    successButton.removeEventListener('click', clickButtonOnMessage);
  } else {
    errorButton.removeEventListener('click', clickButtonOnMessage);
  }
};


const setFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
          showAlertMessage(successMessage, 'success__button');
        },
        () => showAlert('Не удалось отправить форму. Попробуйте еще раз.'),
        new FormData(evt.target),
      );
    } else {
      showAlertMessage(errorMessage, 'error__button');
      unblockSubmitButton();
      showAlert('Не удалось отправить форму. Попробуйте еще раз.');
    }

  });
};

export {pristine, uploadForm, scaleControlValue, publicButton, uploadFile, canselButton, setFormSubmit, blockSubmitButton, unblockSubmitButton, isEnterKey, isEscapeKey,
  onPopupEscKeydown, showFormAfterChange, closingFormAfterChange, changeOfSize };

