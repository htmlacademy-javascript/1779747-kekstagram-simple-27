const pictureTemplateSample = document.querySelector('#picture').content.querySelector('.picture');
const similarPictureFragment = document.createDocumentFragment();
const similarPicturesList = document.querySelector('.pictures');

const rendeListPictures = (photos) => {
  let index = 0;
  photos.forEach(({comments, description, likes, url})=> {
    pictureTemplateSample.href = `#${++index}`;
    const miniaturePhoto = pictureTemplateSample.cloneNode(true);
    const imgMiniaturePhoto = miniaturePhoto.querySelector('.picture__img');
    miniaturePhoto.querySelector('.picture__likes').textContent = likes;
    imgMiniaturePhoto.alt = description;
    miniaturePhoto.querySelector('.picture__comments').textContent = comments;
    imgMiniaturePhoto.src = url;
    similarPictureFragment.appendChild(miniaturePhoto );
  });
  similarPicturesList.appendChild(similarPictureFragment);
};

export {similarPicturesList, rendeListPictures};
