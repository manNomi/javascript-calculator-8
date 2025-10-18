// 랜덤 문자열 생성기

import { Console, Random } from '@woowacourse/mission-utils';
import Controller from '../src/controller/Controller.js';
import inputView from '../src/view/InputView.js';

jest.mock('../src/view/InputView.js', () => ({
  __esModule: true,
  default: {
    readLineMessage: jest.fn(),
  },
}));
// 1. 커스텀 구분자를 포함하는 경우
// 2. 커스텀 구분자를 포함하지 않는경우

// 32 ~ 126 텍스트
// 48 ~ 57 : 숫자

// 숫자 추가하기 함수 getRandomNumber
// 커스텀 구분자 추가하기 함수 getCustomRegexWithText
// 구분자 추가하기 함수

const getCustomRegexWithText = (text) => `//${text}\\n`;
const getRandomNumber = (start = 1, end = 9) =>
  Random.pickNumberInRange(start, end);

const makeCustomRegex = (customRegexLength) => {
  const customRegexs = [];
  for (let i = 0; i < customRegexLength; i++) {
    const textLength = Random.pickNumberInRange(32, 126);
    customRegexs.push(String.fromCharCode(textLength));
  }
  return customRegexs;
};

const getRandomValueInArray = (values) => {
  const index = getRandomNumber(0, values.length - 1);
  return values[index];
};

const getRandomInput = () => {
  let inputResult = '';
  let outputResult = 0;

  // 커스텀 구분자 개수를 정하다
  const customRegexLength = getRandomNumber(1, 1000);
  const madeCustomRegex = makeCustomRegex(customRegexLength);

  // 숫자 개수를 정하다
  const numberLength = getRandomNumber(1, 100000);
  for (let i = 0; i < numberLength; i++) {
    const testNumber = getRandomNumber(0, 2);
    if (testNumber === 0) {
      const randNumber = getRandomNumber(0, 100000);
      inputResult += randNumber; // 추가해야 함
      outputResult += randNumber;
    } else if (testNumber === 1) {
      const randDefaultRegex = getRandomValueInArray([':', ',']);
      inputResult += randDefaultRegex; // 추가해야 함
    } else {
      const randCustomRegex = getRandomValueInArray(madeCustomRegex);
      inputResult += getCustomRegexWithText(randCustomRegex); // 추가해야 함
    }
  }
  return [inputResult, outputResult];
};

describe('랜덤문자열 생성기', () => {
  it('커스텀 구분자를 통해 테스트 합니다', async () => {
    const [input, output] = getRandomInput();
    inputView.readLineMessage.mockImplementationOnce(() => input);

    console.log('input', input);
    console.log('output', output);
    const controller = new Controller();
    const logSpy = jest.spyOn(Console, 'print').mockImplementation(() => {});
    await controller.run();
    expect(logSpy).toHaveBeenCalledWith(`결과 : ${output}`);
  });
});
