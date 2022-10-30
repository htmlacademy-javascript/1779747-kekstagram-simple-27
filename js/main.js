
const PHOTOS = [
  "пляж",
  "указатель",
  "бухта",
  "девушка",
  "суп",
  "машина",
  "клубника",
  "сок",
  "самолет",
  "обувь",
  "пляж",
  "ауди",
  "сельдерей",
  "котенок",
  "космо-тапки",
  "облака",
  "хор",
  "коломбо",
  "тапки",
  "пальмы",
  "курица",
  "закат",
  "краб",
  "концерт",
  "бегемот",
];
const getRandomRange = (min, max) => {
  if (min < 0 || max <0){
    return NaN;
  }
  if(min > max){
    return Math.floor(Math.random() * (Math.floor(min) - Math.ceil(max) + 1));
  }

  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1));
}


function getStringLength(valueString, maxLength) {
  return valueString.length <= maxLength;
}
const getObjectPhoto = function (indexPhoto) {
  return {
    id: indexPhoto + 1,
    url: `photos/${indexPhoto + 1}.jpg`,
    description: PHOTOS[indexPhoto],
    likes: getRandomRange(15, 200),
    comments: getRandomRange(0, 200),
  };
};

const generateArray = Array.from({length: PHOTOS.length}, (v, i) =>getObjectPhoto(i));

