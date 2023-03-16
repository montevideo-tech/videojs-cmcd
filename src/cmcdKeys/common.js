export const roundedToNearstHundredth = (number) => {

  if(number >= 100) 
    return Math.round(number/100) * 100;

  else if(number === 0) return 0;

  else return 100; 
  
}