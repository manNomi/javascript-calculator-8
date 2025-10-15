// 추출기 테스트

import Extraction from '../src/service/model/Extraction';

describe('Extraction 클래스 테스트', () => {
  it('//ㅌ\\n 사이의 커스텀 구분자 ㅌ을 추출한다', () => {
    const extraction = new Extraction();
    expect(extraction.extractCustom()).toEqual(['ㅌ']);
  });
  it('커스텀 구분자가 없다면 빈값으로 반환된다', () => {
    const extraction = new Extraction();
    expect(extraction.extractCustom()).toEqual([]);
  });
});
