import Number from '../src/service/model/Number.js';

describe('넘버 클래스를 테스트 하다', () => {
  it('숫자를 더한다.', () => {
    const numbers = new Number([1, 2, 3]);
    expect(numbers.getAddedNumbers()).toBe(6);
  });
});
