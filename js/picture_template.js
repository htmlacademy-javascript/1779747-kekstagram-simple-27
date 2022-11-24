const pictureTemplateSample = document.querySelector('#picture').content.querySelector('.picture');
const similarPictureFragment = document.createDocumentFragment();
const similarPicturesList = document.querySelector('.pictures');

const rendeListPictures = (photos) => {
  photos.forEach(({comments, id, likes, url})=> {
    const miniaturePhoto = pictureTemplateSample.cloneNode(true);
    const imgMiniaturePhoto = miniaturePhoto.querySelector('.picture__img');
    miniaturePhoto.querySelector('.picture__likes').textContent = comments;
    imgMiniaturePhoto.id = id;
    miniaturePhoto.querySelector('.picture__comments').textContent = likes;
    imgMiniaturePhoto.src = url;
    similarPictureFragment.appendChild(miniaturePhoto );
  });
  similarPicturesList.appendChild(similarPictureFragment);
};

export {similarPicturesList, rendeListPictures};
