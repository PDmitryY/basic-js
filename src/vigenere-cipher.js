const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
 class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;
  }

  encrypt(message, key) {
    if(!message || !key) throw new Error('Incorrect arguments!');

    const keyNumbers = typeof key === 'string' ? this.breakKeyToNumbers(key): key;

    var encryptedMessage = "";
    for (var i = 0, j = 0; i < message.length; i++) {
      var c = message.charCodeAt(i);
      if (this.isUppercase(c)) {
        encryptedMessage += String.fromCharCode((c - 65 + keyNumbers[j % keyNumbers.length]) % 26 + 65);
        j++;
      } else if (this.isLowercase(c)) {
        encryptedMessage += String.fromCharCode((c - 97 + keyNumbers[j % keyNumbers.length]) % 26 + 97);
        j++;
      } else {
        encryptedMessage += message.charAt(i);
      }
    }

    return encryptedMessage.split('').map(letter => letter.toUpperCase()).join('');
  }

  decrypt(encryptedMessage, key) {
    if(!encryptedMessage || !key) throw new Error('Incorrect arguments!');

    if(!this.isDirect) encryptedMessage = encryptedMessage.split('').reverse().join('')

    const keyNumbers = this.breakKeyToNumbers(key);

    for (var i = 0; i < keyNumbers.length; i++)
      keyNumbers[i] = (26 - keyNumbers[i]) % 26;

    const encrypted = this.encrypt(encryptedMessage, keyNumbers);
    return this.isDirect ?  encrypted : encrypted.split('').reverse().join('')
  }

   breakKeyToNumbers(key) {
    var result = [];
    for (var i = 0; i < key.length; i++) {

      var c = key.charCodeAt(i);
      if (this.isLetter(c))
        result.push((c - 65) % 32);
    }
    return result;
  }

   isLetter(char) {
    return this.isUppercase(char) || this.isLowercase(char);
  }

  isUppercase(char) {
    return 65 <= char && char <= 90;
  }

   isLowercase(char) {
    return 97 <= char && char <= 122;
  }
}

module.exports = {
  VigenereCipheringMachine
};
