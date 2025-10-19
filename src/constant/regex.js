export const REGEX_PATTERNS = {
  CUSTOM_DELIMITER_EXTRACT: /\/\/(.*?)\\n/g,
  CUSTOM_DELIMITER_DEFINITION: /\/\/.+?\\n/g,
  REGEX_SPECIAL_CHARS: /[.*+?^${}()|[\]\\]/g,
  WHITESPACE: /\s/,
  DIGIT: /\d/,
};

export const RegexUtils = {
  escapeRegexChars(str) {
    return str.replace(REGEX_PATTERNS.REGEX_SPECIAL_CHARS, '\\$&');
  },

  createContinuousPattern(delimiter) {
    return new RegExp(`${delimiter}{2,}`);
  },

  createSplitPattern(delimiters) {
    return new RegExp(delimiters.join('|'));
  },
};
