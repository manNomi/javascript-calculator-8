import { ERROR_MESSAGE } from '../../constant/error.js';

const DEFAULT_DELIMITERS = [',', ':'];

const validate = {
  validateNumbers(numbers) {
    numbers.forEach((number) => {
      // 공백 체크
      if (typeof number === 'string' && number.trim() === '') {
        throw new Error(ERROR_MESSAGE.NOT_EMPTY);
      }
      // 숫자 여부 체크
      if (Number.isNaN(Number(number))) {
        throw new Error(ERROR_MESSAGE.NOT_NUMBER);
      }
      // 음수 체크
      if (number < 0) {
        throw new Error(ERROR_MESSAGE.NOT_MINUS);
      }
    });
  },

  validateContinuousDelimiters(inputText, escapedDelimiters) {
    const textToValidate = inputText.replace(/\/\/.+?\\n/g, '');
    const allDelimiters = [...DEFAULT_DELIMITERS, ...escapedDelimiters];
    allDelimiters.forEach((delimiter) => {
      const escapedDelimiter = delimiter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const continuousPattern = new RegExp(`${escapedDelimiter}{2,}`);

      if (continuousPattern.test(textToValidate)) {
        throw new Error(ERROR_MESSAGE.DELIMITER_CONTINUOUS);
      }
    });
  },

  validateDelimiters(customDelimiters) {
    customDelimiters.forEach((delimiter) => {
      // 빈 값 체크
      if (!delimiter) {
        throw new Error(ERROR_MESSAGE.DELIMITER_EMPTY);
      }
      // 공백 포함 체크
      if (/\s/.test(delimiter)) {
        throw new Error(ERROR_MESSAGE.DELIMITER_HAS_WHITESPACE);
      }
      // 숫자 포함 체크
      if (/\d/.test(delimiter)) {
        throw new Error(ERROR_MESSAGE.DELIMITER_HAS_NUMBER);
      }
    });
  },
};

export default validate;
