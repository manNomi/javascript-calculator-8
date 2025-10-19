import { RegexUtils } from '../../constant/regex.js';

const DEFAULT_DELIMITERS = [',', ':'];

export default class Parser {
  parseToNumbers(text, escapedDelimiters) {
    const allDelimiters = [...escapedDelimiters, ...DEFAULT_DELIMITERS];
    const splitPattern = RegexUtils.createSplitPattern(allDelimiters);
    return text
      .split(splitPattern)
      .filter((value) => value !== '')
      .map((value) => Number(value));
  }

  removeCustomDelimiterDefinitions(text, delimiters) {
    let result = text;

    delimiters.forEach((delimiter) => {
      const definition = RegexUtils.createCusomPattern(delimiter);
      if (result.startsWith(definition)) {
        result = result.slice(definition.length);
      }
    });

    return result;
  }
}
