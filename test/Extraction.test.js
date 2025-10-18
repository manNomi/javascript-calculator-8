// 추출기 테스트

import Extraction from '../src/service/model/Extraction.js';

describe('Extraction 클래스 테스트', () => {
  it('//ㅌ\\n 사이의 커스텀 구분자 ㅌ을 추출한다', () => {
    const inputText = 'e//ㅌ\\neasd123';
    const extraction = new Extraction();
    expect(extraction.extractCustom(inputText)).toEqual(['ㅌ']);
  });
  it('커스텀 구분자가 없다면 빈값으로 반환된다', () => {
    const inputText = 'eneasd123';
    const extraction = new Extraction();
    expect(extraction.extractCustom(inputText)).toEqual([]);
  });
  it('커스텀 구분자 한개를 테스트하다 //;\\n1', () => {
    const inputText = '//;\\n1';
    const extraction = new Extraction();
    expect(extraction.extractCustom(inputText)).toEqual([';']);
  });

  it('커스텀 구분자 두개를 테스트하다 //;\\n1', () => {
    const inputText = '//;\\n1,//ㅁ\\n1';
    const extraction = new Extraction();
    expect(extraction.extractCustom(inputText)).toEqual([';', 'ㅁ']);
  });

  it('커스텀 구분자가 \\인경우', () => {
    const inputText = '//\\\\n';
    const extraction = new Extraction();
    expect(extraction.extractCustom(inputText)).toEqual(['\\']);
  });
});
