const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
 function transform(arr) {
  if(!Array.isArray(arr)) throw  new Error(`'arr' parameter must be an instance of the Array!`);

  const nextOperations = ['--discard-next', '--double-next'];
  const prevOperations = ['--discard-prev', '--double-prev'];
  const allOperations = [...nextOperations, ...prevOperations];

  let currentNextOperation;

  return arr.reduce((acc, currentValue, currentIndex, initialArray) => {
    if(nextOperations.includes(currentValue)) {
      currentNextOperation = currentValue;
      return acc;
    }

    let prevOperationIn = false;
    if(prevOperations.includes(currentValue)) {
      prevOperationIn = true;

      if(acc.length === 0) return acc;

      if(currentValue === '--discard-prev') {
        acc.splice(currentIndex - 1, 1);
      }

      if(currentValue === '--double-prev') {
        const prevValue = initialArray[currentIndex - 1];
        const prevPrevValue = currentIndex - 2 >= 0 ? initialArray[currentIndex - 2] : undefined;
        if(allOperations.includes(prevValue) || prevPrevValue === '--discard-next') return acc;

        acc.push(prevValue);
      }
    }

    if(currentNextOperation) {
      if(currentNextOperation === '--discard-next') {
        currentNextOperation = null;
        return acc;
      }

      if(currentNextOperation === '--double-next') {
        currentNextOperation = null;
        if(allOperations.includes(currentValue)) return acc;

        acc.push(currentValue);
        acc.push(currentValue);

        return acc;
      }
    }

    currentNextOperation = null;
    if(!prevOperationIn) acc.push(currentValue)

    return acc;
  }, [])
}

module.exports = {
  transform
};
