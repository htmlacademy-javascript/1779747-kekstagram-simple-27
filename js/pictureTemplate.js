import {generateArray} from "./main.js";

const pictureTemplateSample = document.querySelector('#picture').content.querySelector('.picture');
const similarPictureFragment = document.createDocumentFragment();
const similarPicturesList = document.querySelector('.pictures');
const similarWizard = generateArray();

similarWizard.forEach((wizard)=>{
  const wizardPicture = pictureTemplateSample.cloneNode(true);
  wizardPicture.querySelector('.picture__img').src = wizard.url;
  wizardPicture.querySelector('.picture__comments').textContent = wizard.likes;
  wizardPicture.querySelector('.picture__likes').textContent = wizard.comments;
  similarPictureFragment.appendChild(wizardPicture);

});
similarPicturesList.appendChild(similarPictureFragment);
console.log(similarPicturesList);

