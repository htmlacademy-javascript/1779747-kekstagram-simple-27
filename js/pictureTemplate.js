const pictureTemplateSample = document.querySelector('#picture').content.querySelector('.picture');
const similarPictureFragment = document.createDocumentFragment();
const similarPicturesList = document.querySelector('.pictures');

const rendeListPictures = (photos) => {
  photos.forEach(({comments, id, likes, url}) => {
    const wizardPicture = pictureTemplateSample.cloneNode(true);
    wizardPicture.querySelector('.picture__likes').textContent = comments;
    wizardPicture.querySelector('.picture__img').id = id;
    wizardPicture.querySelector('.picture__comments').textContent = likes;
    wizardPicture.querySelector('.picture__img').src = url;
    similarPictureFragment.appendChild(wizardPicture);
  });
  similarPicturesList.appendChild(similarPictureFragment);
};

export {similarPicturesList, rendeListPictures};
