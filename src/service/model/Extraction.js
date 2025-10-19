import { REGEX_PATTERNS, RegexUtils } from '../../constant/regex.js';

export default class Extraction {
  extractCustom(inputText) {
    const matches = Array.from(
      inputText.matchAll(REGEX_PATTERNS.CUSTOM_DELIMITER_EXTRACT),
      (match) => match[1],
    );
    return {
      regexs: matches, // 원본
      escapedRegexs: this.#escapeRegex(matches), // 이스케이프 (사용용)
    };
  }

  #escapeRegex(regexs) {
    return regexs.map((item) => RegexUtils.escapeRegexChars(item));
  }
}
