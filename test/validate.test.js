// 잘못된 입력에 대한 검증
import validate from '../src/service/validate/validate.js';
import { ERROR_MESSAGE } from '../src/constant/error.js';

describe('validate.isNumber - 숫자 검증', () => {
  describe('정상 케이스', () => {
    it('정상적인 숫자 배열은 에러를 발생시키지 않는다', () => {
      const numbers = [1, 2, 3];
      expect(() => validate.isNumber(numbers)).not.toThrow();
    });

    it('0을 포함한 숫자 배열은 정상 처리된다', () => {
      const numbers = [0, 1, 2];
      expect(() => validate.isNumber(numbers)).not.toThrow();
    });

    it('문자열 형태의 숫자는 정상 처리된다', () => {
      const numbers = ['1', '2', '3'];
      expect(() => validate.isNumber(numbers)).not.toThrow();
    });
  });

  describe('예외 케이스 - 숫자가 아닌 값', () => {
    it('숫자가 아닌 문자가 포함된 경우 에러를 발생시킨다', () => {
      const numbers = ['우', '테', '코', 1];
      expect(() => validate.isNumber(numbers)).toThrow(
        ERROR_MESSAGE.NOT_NUMBER,
      );
    });

    it('알파벳이 포함된 경우 에러를 발생시킨다', () => {
      const numbers = ['a', 'b', 1];
      expect(() => validate.isNumber(numbers)).toThrow(
        ERROR_MESSAGE.NOT_NUMBER,
      );
    });
  });

  describe('예외 케이스 - 공백/빈값', () => {
    it('빈 문자열이 포함된 경우 에러를 발생시킨다', () => {
      const numbers = ['', 1, 2, 1];
      expect(() => validate.isNumber(numbers)).toThrow(ERROR_MESSAGE.NOT_EMPTY);
    });

    it('공백 문자열이 포함된 경우 에러를 발생시킨다', () => {
      const numbers = [' ', 1, 2];
      expect(() => validate.isNumber(numbers)).toThrow(ERROR_MESSAGE.NOT_EMPTY);
    });

    it('여러 개의 공백이 포함된 경우 에러를 발생시킨다', () => {
      const numbers = ['   ', 1, 2];
      expect(() => validate.isNumber(numbers)).toThrow(ERROR_MESSAGE.NOT_EMPTY);
    });
  });

  describe('예외 케이스 - 음수', () => {
    it('음수가 포함된 경우 에러를 발생시킨다', () => {
      const numbers = [-1, 2, 3];
      expect(() => validate.isNumber(numbers)).toThrow(ERROR_MESSAGE.NOT_MINUS);
    });

    it('0보다 작은 음수가 포함된 경우 에러를 발생시킨다', () => {
      const numbers = [1, -5, 3];
      expect(() => validate.isNumber(numbers)).toThrow(ERROR_MESSAGE.NOT_MINUS);
    });
  });
});

describe('validate.isRegexContinueError - 연속된 구분자 검증', () => {
  describe('정상 케이스', () => {
    it('구분자가 연속되지 않은 경우 에러를 발생시키지 않는다', () => {
      const inputText = '1,2:3';
      const customRegexs = [];
      expect(() =>
        validate.isRegexContinueError(inputText, customRegexs),
      ).not.toThrow();
    });

    it('커스텀 구분자가 연속되지 않은 경우 에러를 발생시키지 않는다', () => {
      const inputText = '1;2;3';
      const customRegexs = [';'];
      expect(() =>
        validate.isRegexContinueError(inputText, customRegexs),
      ).not.toThrow();
    });
  });

  describe('예외 케이스 - 연속된 구분자', () => {
    it('쉼표가 연속된 경우 에러를 발생시킨다', () => {
      const inputText = '1,,2';
      const customRegexs = [];
      expect(() =>
        validate.isRegexContinueError(inputText, customRegexs),
      ).toThrow('[ERROR]');
    });

    it('콜론이 연속된 경우 에러를 발생시킨다', () => {
      const inputText = '1::2';
      const customRegexs = [];
      expect(() =>
        validate.isRegexContinueError(inputText, customRegexs),
      ).toThrow('[ERROR]');
    });

    it('커스텀 구분자가 연속된 경우 에러를 발생시킨다', () => {
      const inputText = '1;;2';
      const customRegexs = [';'];
      expect(() =>
        validate.isRegexContinueError(inputText, customRegexs),
      ).toThrow('[ERROR]');
    });

    it('세 개 이상 연속된 구분자도 에러를 발생시킨다', () => {
      const inputText = '1,,,2';
      const customRegexs = [];
      expect(() =>
        validate.isRegexContinueError(inputText, customRegexs),
      ).toThrow('[ERROR]');
    });
  });
});

describe('validate.isRegexValidError - 구분자 유효성 검증', () => {
  describe('정상 케이스', () => {
    it('올바른 커스텀 구분자는 에러를 발생시키지 않는다', () => {
      const customRegexs = [';', '|'];
      expect(() => validate.isRegexValidError(customRegexs)).not.toThrow();
    });

    it('특수문자 구분자는 정상 처리된다', () => {
      const customRegexs = ['!', '@', '#'];
      expect(() => validate.isRegexValidError(customRegexs)).not.toThrow();
    });

    it('한글 구분자는 정상 처리된다', () => {
      const customRegexs = ['가', 'ㄱ'];
      expect(() => validate.isRegexValidError(customRegexs)).not.toThrow();
    });
  });

  describe('예외 케이스 - 빈 구분자', () => {
    it('빈 문자열 구분자는 에러를 발생시킨다', () => {
      const customRegexs = [''];
      expect(() => validate.isRegexValidError(customRegexs)).toThrow('[ERROR]');
    });

    it('여러 구분자 중 빈 값이 포함된 경우 에러를 발생시킨다', () => {
      const customRegexs = [';', '', '|'];
      expect(() => validate.isRegexValidError(customRegexs)).toThrow('[ERROR]');
    });
  });

  describe('예외 케이스 - 공백 포함', () => {
    it('공백이 포함된 구분자는 에러를 발생시킨다', () => {
      const customRegexs = [' '];
      expect(() => validate.isRegexValidError(customRegexs)).toThrow('[ERROR]');
    });

    it('구분자에 공백이 섞여있는 경우 에러를 발생시킨다', () => {
      const customRegexs = ['a b'];
      expect(() => validate.isRegexValidError(customRegexs)).toThrow('[ERROR]');
    });
  });

  describe('예외 케이스 - 숫자 포함', () => {
    it('숫자가 포함된 구분자는 에러를 발생시킨다', () => {
      const customRegexs = ['1'];
      expect(() => validate.isRegexValidError(customRegexs)).toThrow('[ERROR]');
    });

    it('문자와 숫자가 섞인 구분자는 에러를 발생시킨다', () => {
      const customRegexs = ['a1'];
      expect(() => validate.isRegexValidError(customRegexs)).toThrow('[ERROR]');
    });

    it('여러 구분자 중 숫자가 포함된 경우 에러를 발생시킨다', () => {
      const customRegexs = [';', '5', '|'];
      expect(() => validate.isRegexValidError(customRegexs)).toThrow('[ERROR]');
    });
  });
});
