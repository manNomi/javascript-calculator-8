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

describe('잘못된 구분자에 대한 ERROR', () => {
  it('올바른 입력 1,2:3', () => {
    const inputText = '1,2:3';
    const regexs = [];
    expect(() => validate.isRegexError(inputText, regexs)).not.toThrow(
      '[ERROR]',
    );
  });

  it('연속된 구분자 ERROR', () => {
    const inputText = '12,,1';
    const regexs = ['a'];
    expect(() => validate.isRegexError(inputText, regexs)).toThrow('[ERROR]');
  });
  it('구분자가 선입력된 경우 허용', () => {
    const inputText = ',12,1';
    const regexs = [];
    expect(() => validate.isRegexError(inputText, regexs)).not.toThrow(
      '[ERROR]',
    );
  });
  it('커스텀 구분자 양식을 포함한경우 //a\\n123a123', () => {
    const inputText = '//a\\n123a123';
    const regexs = ['a'];
    expect(() => validate.isRegexError(inputText, regexs)).not.toThrow(
      '[ERROR]',
    );
  });

  it('커스텀 구분자 양식이 여러번 포함한경우 //a\\n123a123//n\\123n123', () => {
    const inputText = '//a\\n123a123';
    const regexs = ['a', 'n'];
    expect(() => validate.isRegexError(inputText, regexs)).not.toThrow(
      '[ERROR]',
    );
  });

  it('커스텀 구분자 여러번 - 구분자 여러번 //a\\n123a123//n\\n123n123nn123', () => {
    const inputText = '//a\\n123a123//n\\n123n123nn123';
    const regexs = ['a', 'n'];
    expect(() => validate.isRegexError(inputText, regexs)).toThrow('[ERROR]');
  });
});
