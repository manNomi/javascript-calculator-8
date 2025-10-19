import { ERROR_MESSAGE } from '../../constant/error.js';

const validate = {
  isNumber(numbers) {
    numbers.forEach((number) => {
      // 공백을 허용하지 않음
      if (typeof number === 'string' && number.trim() === '')
        throw new Error(ERROR_MESSAGE.NOT_EMPTY);
      if (Number.isNaN(Number(number)))
        throw new Error(ERROR_MESSAGE.NOT_NUMBER);
      if (number < 0) throw new Error(ERROR_MESSAGE.NOT_MINUS);
    });
  },
  isRegexContinueError(inputText, customRegexs) {
    // 각 구분자마다 연속 검사
    [',', ':', ...customRegexs].forEach((delim) => {
      const regex = new RegExp(`${delim}{2,}`);
      if (regex.test(inputText))
        throw new Error('[ERROR] 연속된 구분자가 존재합니다');
    });
  },
  isRegexValidError(customRegexs) {
    customRegexs.forEach((regex) => {
      if (!regex) {
        throw new Error('[ERROR]구분자가 공백입니다');
      }
      // 공백 포함 체크
      if (/\s/.test(regex)) {
        throw new Error('[ERROR] 구분자가 공백입니다');
      }
      // 숫자 포함 체크
      if (/\d/.test(regex)) {
        throw new Error('[ERROR] 구분자가 숫자입니다');
      }
    });
  },

  // node js 환경에서 입력은 512MB~1GB 로 isLong 함수 불필요
  // isLong(numbers) {
  //   if (numbers.length >= 50) {
  //     throw new Error('[ERROR]');
  //   }
  // },
};
export default validate;
