const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class DepthCalculator with method calculateDepth
 * that calculates deoth of nested array
 * 
 * @example
 * 
 * const depthCalc = new DepthCalculator();
 * depthCalc.calculateDepth([1, 2, 3, 4, 5]) => 1
 * depthCalc.calculateDepth([1, 2, 3, [4, 5]]) => 2
 * depthCalc.calculateDepth([[[]]]) => 3
 *
 */
 class DepthCalculator {
  calculateDepth(arr, depth = 0) {
    return arr.reduce((acc, curElement) => {
      if(Array.isArray(curElement)) {
        return  Math.max(acc, this.calculateDepth(curElement, depth + 1)) ;
      }
      else {
        return acc
      }
    }, depth + 1);
  }
}

module.exports = {
  DepthCalculator
};
