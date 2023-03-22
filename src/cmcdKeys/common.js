export const roundedToNearstHundredth = (number) => {

  if (number >= 100) {
    return Math.round(number / 100) * 100;
  } else if (number === 0) {
    return 0;
  }
  return 100;
};

export const showBufferlengthKey = (cmcdObject) => {
  if (cmcdObject.ot !== undefined) {
    if (cmcdObject.ot === 'v' || cmcdObject.ot === 'a' || cmcdObject.ot === 'av') {
      return true;
    }
  }
  return false;
};
