/**
 * 정규식 패턴 상수
 */
export const REGEX_PATTERNS = {
  // 커스텀 구분자 추출: //;\\n 형식에서 ; 추출
  CUSTOM_DELIMITER_EXTRACT: /\/\/(.*?)\\n/g,

  // 커스텀 구분자 정의 부분 제거: //;\\n 제거
  CUSTOM_DELIMITER_DEFINITION: /\/\/.+?\\n/g,

  // 정규식 특수문자 이스케이프용
  REGEX_SPECIAL_CHARS: /[.*+?^${}()|[\]\\]/g,

  // 공백 검사
  WHITESPACE: /\s/,

  // 숫자 검사
  DIGIT: /\d/,
};

/**
 * 정규식 관련 유틸리티 함수
 */
export const RegexUtils = {
  /**
   * 정규식 특수문자를 이스케이프합니다.
   * @param {string} str - 이스케이프할 문자열
   * @returns {string} 이스케이프된 문자열
   */
  escapeRegexChars(str) {
    return str.replace(REGEX_PATTERNS.REGEX_SPECIAL_CHARS, '\\$&');
  },

  /**
   * 연속된 구분자를 검사하는 정규식을 생성합니다.
   * @param {string} delimiter - 이스케이프된 구분자
   * @returns {RegExp} 연속 검사용 정규식
   */
  createContinuousPattern(delimiter) {
    return new RegExp(`${delimiter}{2,}`);
  },

  /**
   * 여러 구분자로 분할하는 정규식을 생성합니다.
   * @param {Array<string>} delimiters - 구분자 배열
   * @returns {RegExp} 분할용 정규식
   */
  createSplitPattern(delimiters) {
    return new RegExp(delimiters.join('|'));
  },
};
