import {imgPreview, resetEffectData, replaceClass, changeSlider} from './image_effect.js';
import {isEnterKey, isEscapeKey} from './util.js';
import {sendData} from './server_data.js';

const uploadFile = document.querySelector('#upload-file');
const showForm = document.querySelector('.img-upload__overlay');
const canselButton = document.querySelector('#upload-cancel');
const uploadForm = document.querySelector('.img-upload__form');
const publicButton = document.querySelector('#upload-submit');
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

function onPopupEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (templateMessage === undefined){closingFormAfterChange();}
  }
}

const showFormAfterChange = () => {
  textDescription.textContent = '';
  showForm.classList.remove('hidden');
  showForm.scrollTop = 55;
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
  resetForm();
  resetEffectData();
  changeSlider();
};

function closingFormAfterChange () {
  showForm.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  uploadForm.reset();
  resetForm();
}

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'img-upload__text__error-text',
});

const changeOfSize = (scaleButton) => {
  if(scaleButton && sizeWindow > 0.25 ){
    sizeWindow = sizeWindow - 0.25;
    scaleControlValue.value = `${sizeWindow * 100}%`;
    imgPreview.style.transform = `scale(${sizeWindow})`;
  }
  if (!scaleButton && sizeWindow < 1){
    sizeWindow = sizeWindow + 0.25;
    scaleControlValue.value = `${sizeWindow * 100}%`;
    imgPreview.style.transform = `scale(${sizeWindow})`;
  }
};

const onMessageEsc = (evt) => {
  evt.preventDefault();
  if (isEscapeKey(evt)) {
    hideWindowMessage(evt.target.className);
  }
};
const onMessageClick = (evt) => {
  if (evt.target.className !== 'success__inner' && evt.target.className !== 'success__title' &&
    evt.target.className !== 'error__inner' && evt.target.className !== 'error__title') {
    hideWindowMessage(evt.target.className);
  }
};

const onMessageButton = (evt) => {
  if (evt.target.className === 'success__button') {
    hideWindowMessage(evt.target.className);
  }
};

function hideWindowMessage (event){
  templateMessage.remove();
  templateMessage = undefined;
  window.removeEventListener('keydown', onMessageEsc);
  document.removeEventListener('click', onMessageClick);
  const button = event.className === 'success__button' ? successButton : errorButton;
  button.removeEventListener('click', onMessageButton);
}

const showAlertMessage = (message, viewMessage) => {
  templateMessage = message.cloneNode(true);
  document.querySelector('body').append(templateMessage);
  window.addEventListener('keydown', onMessageEsc);
  document.addEventListener('click', onMessageClick);
  const button = viewMessage === 'success__button' ? successButton : errorButton;
  button.addEventListener('click', onMessageButton);
};

const unblockSubmitButton = () => {
  publicButton.disabled = false;
  publicButton.textContent = 'ОПУБЛИКОВАТЬ';
};
const blockSubmitButton = () => {
  publicButton.disabled = true;
  publicButton.textContent = 'Отправляю...';
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
        () => {
          showAlertMessage(errorMessage, 'error__button');
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

export {pristine, uploadForm, scaleControlValue, publicButton, uploadFile, canselButton, setFormSubmit, blockSubmitButton, unblockSubmitButton, isEnterKey, isEscapeKey,
  onPopupEscKeydown, showFormAfterChange, closingFormAfterChange, changeOfSize };

