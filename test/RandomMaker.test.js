// 랜덤 문자열 생성기

import { Console } from '@woowacourse/mission-utils';

import Controller from '../src/controller/Controller.js';
import inputView from '../src/view/InputView.js';
import Parser from '../src/service/model/Parser.js';
import Extraction from '../src/service/model/Extraction.js';
import { compareArrays, getRandomInput, saveErrorCase } from './randomUtil.js';

jest.mock('../src/view/InputView.js', () => ({
  __esModule: true,
  default: {
    readLineMessage: jest.fn(),
  },
}));

const TOTAL_ITERATIONS = 10000;

describe(`랜덤 테스트 ${TOTAL_ITERATIONS}`, () => {
  it(`커스텀 구분자를 통해 ${TOTAL_ITERATIONS} 테스트 합니다`, async () => {
    for (let i = 1; i <= TOTAL_ITERATIONS; i++) {
      const [input, output, parseMumber, extracionRegex] = getRandomInput();

      inputView.readLineMessage.mockImplementationOnce(() => input);

      const controller = new Controller();
      const logSpy = jest.spyOn(Console, 'print').mockImplementation(() => {});
      const parsedValueSpy = jest.spyOn(Parser.prototype, 'parseToNumbers');
      const extractionValueSpy = jest.spyOn(
        Extraction.prototype,
        'extractCustomDelimiters',
      );

      try {
        await controller.run();

        const extractionSpyValue = extractionValueSpy.mock.results[0].value;
        const parsedSpyValue = parsedValueSpy.mock.results[0].value;

        if (i % 100 === 0) {
          console.log(`진행 중: ${i}/${TOTAL_ITERATIONS} `);
        }

        compareArrays(parseMumber, parsedSpyValue);

        expect(new Set(extracionRegex)).toEqual(
          new Set(extractionSpyValue.raw),
        );
        expect(parseMumber).toEqual(parsedSpyValue);
        expect(logSpy).toHaveBeenCalledWith(`결과 : ${output}`);
      } catch (err) {
        // 에러 발생 시 즉시 저장하고 테스트 중단
        saveErrorCase(
          input,
          output,
          parseMumber,
          extracionRegex,
          i,
          err.message,
        );

        // 에러를 다시 던져서 테스트 실패 처리
        throw new Error(
          `테스트 실패 (${i}/${TOTAL_ITERATIONS}번째)\n원본 에러: ${err.message}`,
        );
      }

      // spy 정리
      logSpy.mockRestore();
      parsedValueSpy.mockRestore();
      extractionValueSpy.mockRestore();
    }

    console.log(
      `\n모든 테스트 통과! (${TOTAL_ITERATIONS}/${TOTAL_ITERATIONS})`,
    );
  });
});
