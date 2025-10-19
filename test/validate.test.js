// 잘못된 입력에 대한 검증
import validate from '../src/service/validate/validate.js';

describe('잘못된 입력에 대한 검증', () => {
  // 파싱 전 - 예외

  // it('너무 긴 메시지가(50자) 입력된 경우 ERROR', () => {
  //   const input =
  //     '1234567891011122312312312312312312312312321312312312312312312313';
  //   expect(() => validate.isLong(input)).toThrow('[ERROR]');
  // });

  it('숫자가 아닌값이 포함된 경우 ERROR', () => {
    const parseInput = ['우', '테', '코', 1];
    expect(() => validate.isNumber(parseInput)).toThrow('[ERROR]');
  });
  // it('빈 입력 이 포함된 경우 "" 빈값으로 0으로 허용', () => {
  //   const parseInput = ['', 1, 2, 1];
  //   expect(() => validate.isNumber(parseInput)).not.toThrow('[ERROR]');
  // });
  // it('공백 입력인경우 "  " 빈값으로 0으로 허용', () => {
  //   const parseInput = [' ', 1, ' ', 1];
  //   expect(() => validate.isNumber(parseInput)).not.toThrow('[ERROR]');
  // });

  it('빈 입력 이 포함된 경우 "" ERROR', () => {
    const parseInput = ['', 1, 2, 1];
    expect(() => validate.isNumber(parseInput)).toThrow('[ERROR]');
  });
  it('공백 입력인경우 "  " ERROR', () => {
    const parseInput = [' ', 1, ' ', 1];
    expect(() => validate.isNumber(parseInput)).toThrow('[ERROR]');
  });

  it('음수가 입력되는 경우 ERROR', () => {
    const parseInput = [-1, 2, 3];
    expect(() => validate.isNumber(parseInput)).toThrow('[ERROR]');
  });
});
