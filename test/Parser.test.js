import Parser from '../src/service/model/Parser.js';

describe('Parser 클래스를 테스트 하다', () => {
  const parser = new Parser();
  it('구분자와 입력을 받아 파싱을 하다', () => {
    const regx = ['/', '|'];
    const exInput = '/123/2|31';
    expect(parser.parseData(regx, exInput)).toEqual([123, 2, 31]);
  });
});

// issue 객체나 배열은 toEqual을 사용해야함...
