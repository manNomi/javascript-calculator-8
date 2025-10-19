import fs from 'fs';
import path from 'path';
import { Random } from '@woowacourse/mission-utils';

const ERROR_DIR = path.join(process.cwd(), 'error_cases');
if (!fs.existsSync(ERROR_DIR)) fs.mkdirSync(ERROR_DIR);
const errorFilePath = path.join(ERROR_DIR, 'last_error.json');

const getCustomRegexWithText = (text) => `//${text}\\n`;
const getRandomNumber = (start = 1, end = 9) =>
  Random.pickNumberInRange(start, end);

// 커스텀 구분자 생성기
const makeCustomRegex = (customRegexCount) => {
  const customRegexs = [];
  for (let i = 0; i < customRegexCount; i++) {
    let charCode;
    do {
      charCode = Random.pickNumberInRange(33, 126); // 32번(공백) 제외
    } while (charCode >= 48 && charCode <= 57); // 숫자 제외
    customRegexs.push(String.fromCharCode(charCode));
  }
  return [...new Set(customRegexs)];
};

// ARRAY -> 랜덤한 value 추출
const getRandomValueInArray = (values) => {
  const index = getRandomNumber(0, values.length - 1);
  return values[index];
};

// 애러 저장
export const saveErrorCase = (input, output, parseMumber, extracionRegex) => {
  fs.writeFileSync(
    errorFilePath,
    JSON.stringify({ input, output, extracionRegex, parseMumber }, null, 4),
  );
};

// 랜덤 인풋 생성기
export const getRandomInput = () => {
  // 애러가 나면 애러부터 다시 검증
  if (fs.existsSync(errorFilePath)) {
    const data = JSON.parse(fs.readFileSync(errorFilePath, 'utf-8'));
    return [data.input, data.output, data.parseMumber, data.extracionRegex];
  }

  let definitionString = ''; // "//P\n//l\n" 등 정의가 담길 부분
  let numberString = ''; // "123P456l789..." 숫자가 담길 부분
  let outputResult = 0;

  const customRegexCount = getRandomNumber(1, 100);
  const madeCustomRegex = makeCustomRegex(customRegexCount);
  const parseMumber = [];

  const usedCustomRegex = [];
  const customRegexNumToUse = getRandomNumber(0, madeCustomRegex.length);
  while (usedCustomRegex.length < customRegexNumToUse) {
    const regex = getRandomValueInArray(madeCustomRegex);
    if (!usedCustomRegex.includes(regex)) {
      usedCustomRegex.push(regex);
    }
  }

  usedCustomRegex.forEach((regex) => {
    definitionString += getCustomRegexWithText(regex); // `//${regex}\n`
  });

  const allAvailableDelimiters = [...usedCustomRegex, ':', ','];

  const numberCount = getRandomNumber(1, 1000);

  for (let i = 0; i < numberCount; i++) {
    const randNumber = getRandomNumber(0, 100000);
    numberString += randNumber; // 숫자 문자열에 추가
    outputResult += randNumber;
    parseMumber.push(randNumber);

    if (i < numberCount - 1) {
      const delimiter = getRandomValueInArray(allAvailableDelimiters);
      numberString += delimiter; // //P\n가 아닌 P 자체가 추가됨
    }
  }

  const inputResult = definitionString + numberString;

  return [inputResult, outputResult, parseMumber, usedCustomRegex];
};

export const compareArrays = (expected, actual) => {
  const maxLength = Math.max(expected.length, actual.length);

  for (let i = 0; i < maxLength; i++) {
    const exp = expected[i];
    const act = actual[i];
    if (exp !== act) {
      throw new Error(`인덱스 ${i}: expected=${exp}, actual=${act}`);
    }
  }
};
