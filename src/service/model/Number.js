export default class Number {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers;
  }

  getAddedNumbers() {
    return this.#numbers.reduce((acc, cur) => acc + cur);
  }
}
