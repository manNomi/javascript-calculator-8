import Parser from '../src/service/model/Parser.js';

describe('Parser 클래스를 테스트 하다', () => {
  const parser = new Parser();
  it('구분자와 입력을 받아 파싱을 하다', () => {
    const regxs = ['/', '|'];
    const inputText = '/123/2|31';
    expect(parser.parseData(regxs, inputText)).toEqual([123, 2, 31]);
  });
});

// issue 객체나 배열은 toEqual을 사용해야함...

describe('Parser 클래스의 useCase를 추가하다', () => {
  const parser = new Parser();

  it('구분자는 기본적으로 , : 를 포함합니다', () => {
    const regxs = [];
    const inputText = '11:6,1';
    expect(parser.parseData(regxs, inputText)).toEqual([11, 6, 1]);
  });

  it('구분자가 숫자인경우', () => {
    const regxs = ['1', '2', '3', '#'];
    const inputText = '1142232#61';
    expect(parser.parseData(regxs, inputText)).toEqual([4, 6]);
  });
  it('구분자에 \\ 이스케이프가 포함되는경우', () => {
    const regxs = ['//\\\\n', '\\\\'];
    const inputText = '//\\n1//\\n2//\\n3';
    expect(parser.parseData(regxs, inputText)).toEqual([1, 2, 3]);
  });
  it('구분자가 여러글자 인경우', () => {
    const regxs = ['ab', 'bc', 'cd'];
    const inputText = 'ab1bc2cd3';
    expect(parser.parseData(regxs, inputText)).toEqual([1, 2, 3]);
  });

  it('음수가 포함되는 경우', () => {
    const inputText = '-1,2,3';
    expect(parser.parseData([], inputText)).toEqual([-1, 2, 3]);
  });
});

// issue \ 처리가 매우 까다로움
// \\ 의 경우에는 \\\\ 로 처리해야한다
// js에서 \는 \\로 작성해야하므로
// 따라서 inputText의 \\는 \\\\로 처리해야하는것
