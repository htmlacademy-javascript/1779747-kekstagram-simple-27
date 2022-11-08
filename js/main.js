import {getObjectPhoto} from './objectPhoto.js';
import {PHOTOS} from './photo.js';



const generateArray = () => Array.from({length: PHOTOS.length}, (v, i) => getObjectPhoto(i));
export {generateArray};

