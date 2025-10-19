export default class Parser {
  parseData(inputText, esacpedRegexs) {
    const totalRegexs = [...esacpedRegexs, ',', ':'];
    const regex = new RegExp(totalRegexs.join('|'));
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
