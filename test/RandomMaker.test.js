// 랜덤 문자열 생성기

import { Console, Random } from '@woowacourse/mission-utils';
import fs from 'fs';
import path from 'path';
import Controller from '../src/controller/Controller.js';
import inputView from '../src/view/InputView.js';
import Parser from '../src/service/model/Parser.js';
import Extraction from '../src/service/model/Extraction.js';

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

const compareArrays = (expected, actual) => {
  const maxLength = Math.max(expected.length, actual.length);
  let hasDifference = false;

  for (let i = 0; i < maxLength; i++) {
    const exp = expected[i];
    const act = actual[i];
    if (exp !== act) {
      console.log(`인덱스 ${i}: expected=${exp}, actual=${act}`);
      hasDifference = true;
    }
  }

  if (!hasDifference) {
    console.log('두 배열은 동일합니다.');
  }
};

const ERROR_DIR = path.join(process.cwd(), 'error_cases');
if (!fs.existsSync(ERROR_DIR)) fs.mkdirSync(ERROR_DIR);
const errorFilePath = path.join(ERROR_DIR, 'last_error.json');

export const saveErrorCase = (input, output, parseMumber, extracionRegex) => {
  fs.writeFileSync(
    errorFilePath,
    JSON.stringify({ input, output, extracionRegex, parseMumber }, null, 4),
  );
};
const getCustomRegexWithText = (text) => `//${text}\\n`;
const getRandomNumber = (start = 1, end = 9) =>
  Random.pickNumberInRange(start, end);

const makeCustomRegex = (customRegexLength) => {
  const customRegexs = [];
  for (let i = 0; i < customRegexLength; i++) {
    let charCode;
    do {
      charCode = Random.pickNumberInRange(33, 126); // 32번(공백) 제외
    } while (charCode >= 48 && charCode <= 57); // 숫자 제외
    customRegexs.push(String.fromCharCode(charCode));
  }
  return [...new Set(customRegexs)];
};

const getRandomValueInArray = (values) => {
  const index = getRandomNumber(0, values.length - 1);
  return values[index];
};

const getRandomInput = () => {
  if (fs.existsSync(errorFilePath)) {
    const data = JSON.parse(fs.readFileSync(errorFilePath, 'utf-8'));
    return [data.input, data.output, data.parseMumber, data.extracionRegex];
  }

  let definitionString = ''; // "//P\n//l\n" 등 정의가 담길 부분
  let numberString = ''; // "123P456l789..." 숫자가 담길 부분
  let outputResult = 0;

  const customRegexLength = getRandomNumber(1, 100);
  const madeCustomRegex = makeCustomRegex(customRegexLength);
  const parseMumber = [];

  const usedCustomRegex = [];
  const numToUse = getRandomNumber(1, madeCustomRegex.length); // 최소 1개는 사용
  while (usedCustomRegex.length < numToUse) {
    const regex = getRandomValueInArray(madeCustomRegex);
    if (!usedCustomRegex.includes(regex)) {
      usedCustomRegex.push(regex);
    }
  }

  usedCustomRegex.forEach((regex) => {
    definitionString += getCustomRegexWithText(regex); // `//${regex}\n`
  });

  const allAvailableDelimiters = [...usedCustomRegex, ':', ','];

  const numberLength = getRandomNumber(1, 1000);

  for (let i = 0; i < numberLength; i++) {
    const randNumber = getRandomNumber(0, 100000);
    numberString += randNumber; // 숫자 문자열에 추가
    outputResult += randNumber;
    parseMumber.push(randNumber);

    if (i < numberLength - 1) {
      const delimiter = getRandomValueInArray(allAvailableDelimiters);
      numberString += delimiter; // `//P\n`가 아닌 `P` 자체가 추가됨
    }
  }

  const inputResult = definitionString + numberString;

  return [inputResult, outputResult, parseMumber, usedCustomRegex];
};

it('커스텀 구분자를 통해 테스트 합니다', async () => {
  const [input, output, parseMumber, extracionRegex] = getRandomInput();

  inputView.readLineMessage.mockImplementationOnce(() => input);

  const controller = new Controller();
  const logSpy = jest.spyOn(Console, 'print').mockImplementation(() => {});
  const parsedValueSpy = jest.spyOn(Parser.prototype, 'parseData');
  const extractionValueSpy = jest.spyOn(Extraction.prototype, 'extractCustom');

  try {
    await controller.run();

    const extractionSpyValue = extractionValueSpy.mock.results[0].value;
    const parsedSpyValue = parsedValueSpy.mock.results[0].value;

    compareArrays(parseMumber, parsedSpyValue); // 디버깅을 위한 콘솔
    expect(new Set(extracionRegex)).toEqual(new Set(extractionSpyValue.regexs));
    expect(parseMumber).toEqual(parsedSpyValue);
    expect(logSpy).toHaveBeenCalledWith(`결과 : ${output}`);
  } catch (err) {
    // 실패하면 에러 케이스 저장
    saveErrorCase(input, output, parseMumber, extracionRegex);
    throw err;
  }
});
