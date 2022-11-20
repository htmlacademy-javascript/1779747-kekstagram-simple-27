import {changeOfSize} from "./form.js";

const imgPreview = document.querySelector('.img-upload__preview');
const spanbutton = document.querySelector('.effects__list');
const sliderElement  = document.querySelector('.effect-level__slider');

// уменяю класс при клике на кнопку эффекта
const replaceClass =  (newClass) => {
  imgPreview.classList.remove(imgPreview.classList[1]);
  imgPreview.classList.add(newClass);
};


// Записываем в объекты параметры эффектов

const EFFECTS = [
  {
    name: 'none',
    min: 0,
    max: 0,
    step: 0
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
];


let effectData = EFFECTS[0];

//сбразываю эффект
const noneEffectData = () => effectData = EFFECTS[0];

//создаю слайдер
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 10,
  step: 1,
  connect: 'lower',

});

// изменяю значения слайдера

const changeSlider = () => {
  if (effectData.name === 'none') {
    imgPreview.style.filter = '';
    document.querySelector('.img-upload__effect-level').classList.add('hidden');
  } else {
    document.querySelector('.img-upload__effect-level').classList.remove('hidden');
  };

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: effectData.min,
      max: effectData.max,
    },
    step: effectData.step,
    start: effectData.max,
  });
};


//обработчик события кнопки уменьшения размера
document.querySelector('.img-upload__scale').addEventListener('click', (evt) => {
  (evt.target.textContent === 'Уменьшить') ? changeOfSize(true) : changeOfSize(false);
});


//обработчик события кнопки эффекта
spanbutton.addEventListener('click', (evt) => {
// добавляю класс эффекта фотографии из пред. просмотра
  if(evt.target.value!==undefined) {
    effectData = EFFECTS.find(effect => effect.name === evt.target.value);
    replaceClass(`effects__preview--${evt.target.value}`);
    changeSlider();
  }
});


// обработчик слайдера
sliderElement.noUiSlider.on('update', () => {
  document.querySelector('.effect-level__value').value = sliderElement.noUiSlider.get();
  imgPreview.style.filter = `${effectData.style}(${sliderElement.noUiSlider.get()}${effectData.unit})`;
});


export {imgPreview, noneEffectData, sliderElement, replaceClass, changeSlider};
