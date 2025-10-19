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

  // node js 환경에서 입력은 512MB~1GB 로 isLong 함수 불필요
  // isLong(numbers) {
  //   if (numbers.length >= 50) {
  //     throw new Error('[ERROR]');
  //   }
  // },
};
export default validate;
