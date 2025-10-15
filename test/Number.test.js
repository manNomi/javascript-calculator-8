import { Number } from '../src/service/model/Number';

describe('넘버 클래스를 테스트 하다', () => {
  it('숫자를 더한다.', () => {
    const numbers = Number([1, 2, 3]);
    expect(numbers.sum()).toBe(6);
  });
});
