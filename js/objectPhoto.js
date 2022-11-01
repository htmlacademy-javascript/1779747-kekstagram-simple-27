const getObjectPhoto = function (indexPhoto) {
  return {
    id: indexPhoto + 1,
    url: `photos/${indexPhoto + 1}.jpg`,
    description: PHOTOS[indexPhoto],
    likes: getRandomRange(15, 200),
    comments: getRandomRange(0, 200),
  };
};

export {getObjectPhoto};
