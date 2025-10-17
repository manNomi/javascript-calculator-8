const validate = {
  isIntegers(numbers) {
    numbers.forEach((number) => {
      if (typeof number === 'string' && number.trim() === '') return;
      if (Number.isNaN(Number(number))) throw new Error('[ERROR]');
      if (number <= 0) throw new Error('[ERROR]');
    });
  },
  isLong(numbers) {
    if (numbers.length >= 50) {
      throw new Error('[ERROR]');
    }
  },
};
export default validate;
