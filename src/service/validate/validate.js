const validate = {
  isNotMinus(numbers) {
    numbers.forEach((number) => {
      // 공백을 허용하지 않음
      if (typeof number === 'string' && number.trim() === '')
        throw new Error('[ERROR] 공백이 포함되어 있습니다');
      if (Number.isNaN(Number(number)))
        throw new Error('[ERROR] 숫자가 아닙니다');
      if (number < 0) throw new Error('[ERROR] 음수가 포함되어있습니다');
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
