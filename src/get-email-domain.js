const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given an email address, return it's domain.
 *
 * @param {String} email
 * @return {String}
 *
 * @example
 * For the input 'prettyandsimple@example.com', the output should be 'example.com'
 *
 */
function getEmailDomain(email) {
  debugger
  let index = email.indexOf('@');
  let result = email;
  while (index > 0) {
    result = result.slice(index+1);
    index = result.indexOf('@');
  }
  return result;
}

module.exports = {
  getEmailDomain
};
