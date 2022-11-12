
import {getObjectPhoto} from './objectPhoto.js';
import {PHOTOS} from './photo.js';

const pictureTemplateSample = document.querySelector('#picture').content.querySelector('.picture');
const similarPictureFragment = document.createDocumentFragment();
const similarPicturesList = document.querySelector('.pictures');
const similarWizard = Array.from({length: PHOTOS.length}, (v, i) => getObjectPhoto(i));


const rendeListPictures = () => {
    similarWizard.forEach((wizard) => {
    const wizardPicture = pictureTemplateSample.cloneNode(true);
    wizardPicture.querySelector('.picture__img').src = wizard.url;
    wizardPicture.querySelector('.picture__comments').textContent = wizard.likes;
    wizardPicture.querySelector('.picture__likes').textContent = wizard.comments;
    similarPictureFragment.appendChild(wizardPicture);

  });
  similarPicturesList.appendChild(similarPictureFragment);
  //console.log(similarPicturesList);
};

const clearListPictures = () => {

  //similarPicturesList.removeChild();
 // console.log(similarPicturesList.length);

};

export { rendeListPictures, clearListPictures};
export {similarPicturesList};
