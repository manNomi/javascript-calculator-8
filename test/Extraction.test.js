import Extraction from '../src/service/model/Extraction.js';

describe('Extraction 클래스 테스트', () => {
  const extraction = new Extraction();

  it('//ㅌ\\n 사이의 커스텀 구분자 ㅌ을 추출한다', () => {
    const text = 'e//ㅌ\\neasd123';
    const result = extraction.extractCustomDelimiters(text);
    expect(result.raw).toEqual(['ㅌ']);
    expect(result.escaped).toEqual(['ㅌ']);
  });

  it('커스텀 구분자가 없다면 빈 배열로 반환된다', () => {
    const text = 'eneasd123';
    const result = extraction.extractCustomDelimiters(text);
    expect(result.raw).toEqual([]);
    expect(result.escaped).toEqual([]);
  });

  it('커스텀 구분자 한개를 테스트하다 //;\\n1', () => {
    const text = '//;\\n1';
    const result = extraction.extractCustomDelimiters(text);
    expect(result.raw).toEqual([';']);
    expect(result.escaped).toEqual([';']);
  });

  it('커스텀 구분자 두개를 테스트하다 //;\\n1,//ㅁ\\n1', () => {
    const text = '//;\\n1,//ㅁ\\n1';
    const result = extraction.extractCustomDelimiters(text);
    expect(result.raw).toEqual([';', 'ㅁ']);
    expect(result.escaped).toEqual([';', 'ㅁ']);
  });

  it('커스텀 구분자가 특수문자인 경우 이스케이프 처리된다', () => {
    const text = '//.\\n1';
    const result = extraction.extractCustomDelimiters(text);
    expect(result.raw).toEqual(['.']);
    expect(result.escaped).toEqual(['\\.']);
  });

  it('여러 특수문자를 포함한 경우 이스케이프 처리된다', () => {
    const text = '//*\\n1//+\\n2';
    const result = extraction.extractCustomDelimiters(text);
    expect(result.raw).toEqual(['*', '+']);
    expect(result.escaped).toEqual(['\\*', '\\+']);
  });
});
