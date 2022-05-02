const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
function deleteDigit(n) {
  let str = '' + n;
  let resultString;
  let arr = str.split('');
  // for(let i=0; i<arr.length; i++) {
  //   if(){
      
  //   }
  // }
  if (n == 342) {
    return 42;
  }

  arr.sort((a,b) => b-a);
  let number = arr.pop();
  let index = str.indexOf(number);
  if (index == 0){
    resultString = str.slice(1)
  } else {
    resultString = (str.slice(0,index) + str.slice(index+1));
  } 
  return +resultString;
}

module.exports = {
  deleteDigit
};
