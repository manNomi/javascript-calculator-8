import Parser from '../src/service/model/Parser.js';

describe('Parser 클래스를 테스트 하다', () => {
  const parser = new Parser();
  it('구분자와 입력을 받아 파싱을 하다', () => {
    const escapedDelimiters = ['\\/', '\\|'];
    const text = '2/123/2|31';
    expect(parser.parseToNumbers(text, escapedDelimiters)).toEqual([
      2, 123, 2, 31,
    ]);
  });
});

describe('Parser 클래스의 useCase를 추가하다', () => {
  const parser = new Parser();

  it('구분자는 기본적으로 , : 를 포함합니다', () => {
    const escapedDelimiters = [];
    const text = '11:6,1';
    expect(parser.parseToNumbers(text, escapedDelimiters)).toEqual([11, 6, 1]);
  });

  it('구분자가 여러글자 인경우', () => {
    const escapedDelimiters = ['ab', 'bc', 'cd'];
    const text = '1ab2bc2cd3';
    expect(parser.parseToNumbers(text, escapedDelimiters)).toEqual([
      1, 2, 2, 3,
    ]);
  });
});

describe('파싱 - 커스텀 구분자 정의 제거', () => {
  const parser = new Parser();

  it('커스텀 구분자 정의가 여러개 있는 경우', () => {
    const delimiters = [';', '|'];
    const text = '//;\\n//|\\n1';
    expect(parser.removeCustomDelimiterDefinitions(text, delimiters)).toEqual(
      '1',
    );
  });
});
