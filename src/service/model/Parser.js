export default class Parser {
  parseData(regexs, inputText) {
    const totalRegexs = [...regexs, ',', ':'];
    const regex = new RegExp(totalRegexs.join('|'));
    return inputText
      .split(regex)
      .filter((item) => item !== '') // 빈문자열 제거
      .map((item) => Number(item));
  }

  parseCustomRegex(regexs, inputText) {
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
