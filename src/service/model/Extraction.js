import { REGEX_PATTERNS, RegexUtils } from '../../constant/regex.js';

export default class Extraction {
  extractCustomDelimiters(text) {
    const delimiters = Array.from(
      text.matchAll(REGEX_PATTERNS.CUSTOM_DELIMITER_EXTRACT),
      (match) => match[1],
    );
    return {
      raw: delimiters,
      escaped: this.#escapeDelimiters(delimiters),
    };
  }

  #escapeDelimiters(delimiters) {
    return delimiters.map((delimiter) =>
      RegexUtils.escapeRegexChars(delimiter),
    );
  }
}
