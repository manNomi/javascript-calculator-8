import { RegexUtils } from '../../constant/regex.js';

export default class Parser {
  parseData(inputText, escapedRegexs) {
    const totalRegexs = [...escapedRegexs, ',', ':'];
    const regex = RegexUtils.createSplitPattern(totalRegexs);
    return inputText
      .split(regex)
      .filter((item) => item !== '') // 빈문자열 제거
      .map((item) => Number(item));
  }

  parseCustomRegex(inputText, regexs) {
    let inputResult = inputText;

    regexs.forEach((regex) => {
      const splitType = `//${regex}\\n`;
      if (inputResult.startsWith(splitType)) {
        inputResult = inputResult.slice(splitType.length);
      }
    });

    return inputResult;
  }
}
