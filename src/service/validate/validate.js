const validate = {
  isIntegers(numbers) {
    numbers.forEach((number) => {
      if (typeof number === 'string' && number.trim() === '') return;
      if (Number.isNaN(Number(number))) throw new Error('[ERROR]');
      if (number <= 0) throw new Error('[ERROR]');
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
