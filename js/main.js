function getRandomRange(min, max) {
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
