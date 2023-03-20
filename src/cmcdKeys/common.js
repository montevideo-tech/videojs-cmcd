export const roundedToNearstHundredth = (number) => {

  if (number >= 100) {
    return Math.round(number / 100) * 100;
  } else if (number === 0) {
    return 0;
  }
  return 100;
};

export const deletekeys = (cmcd) => {
  if (cmcd.sf === undefined) {
    delete cmcd.sf;
  } 
  if (cmcd.ot === undefined) {
    delete cmcd.ot;
  }
  return cmcd;
};
