// 랜덤 문자열 생성기

import { Console, Random } from '@woowacourse/mission-utils';
import fs from 'fs';
import path from 'path';
import Controller from '../src/controller/Controller.js';
import inputView from '../src/view/InputView.js';
import Parser from '../src/service/model/Parser.js';

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

const ERROR_DIR = path.join(process.cwd(), 'error_cases');
if (!fs.existsSync(ERROR_DIR)) fs.mkdirSync(ERROR_DIR);
const errorFilePath = path.join(ERROR_DIR, 'last_error.json');

export const saveErrorCase = (input, output, parseMumber) => {
  fs.writeFileSync(
    errorFilePath,
    JSON.stringify({ input, output, parseMumber }, null, 3),
  );
};
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
  if (fs.existsSync(errorFilePath)) {
    const data = JSON.parse(fs.readFileSync(errorFilePath, 'utf-8'));
    return [data.input, data.output, data.parseMumber];
  }
  let inputResult = '';
  let outputResult = 0;

  // 커스텀 구분자 개수를 정하다
  const customRegexLength = getRandomNumber(1, 100);
  const madeCustomRegex = makeCustomRegex(customRegexLength);
  const addedCustomRegex = [];
  const parseMumber = [];

  // 숫자 개수를 정하다
  const numberLength = getRandomNumber(1, 1000);
  for (let i = 0; i < numberLength; i++) {
    const testNumber = getRandomNumber(0, 2);
    if (testNumber === 0) {
      const randNumber = getRandomNumber(0, 100000);
      inputResult += randNumber; // 추가해야 함
      outputResult += randNumber;
      parseMumber.push(randNumber);
    } else if (testNumber === 1) {
      const randDefaultRegex = getRandomValueInArray([':', ',']);
      inputResult += randDefaultRegex; // 추가해야 함
    } else {
      const randCustomRegex = getRandomValueInArray(madeCustomRegex);
      if (!addedCustomRegex.includes(randCustomRegex)) {
        inputResult += getCustomRegexWithText(randCustomRegex); // 추가해야 함
        addedCustomRegex.push(randCustomRegex);
      } else {
        inputResult += randCustomRegex;
      }
    }
  }
  return [inputResult, outputResult, parseMumber];
};

describe('랜덤문자열 생성기', () => {
  it('커스텀 구분자를 통해 테스트 합니다', async () => {
    const [input, output, parseMumber] = getRandomInput();

    inputView.readLineMessage.mockImplementationOnce(() => input);

    const controller = new Controller();
    const logSpy = jest.spyOn(Console, 'print').mockImplementation(() => {});
    const parsedValueSpy = jest.spyOn(Parser.prototype, 'parseData');

    let parsedValue;
    try {
      await controller.run();
      parsedValue = parsedValueSpy.mock.results[0].value;
      expect(parseMumber).toEqual(parsedValue);
      expect(logSpy).toHaveBeenCalledWith(`결과 : ${output}`);
    } catch (err) {
      // 실패하면 에러 케이스 저장
      saveErrorCase(input, output, parsedValue);
      throw err;
    }
  });
});
