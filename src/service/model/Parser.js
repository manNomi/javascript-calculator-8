export default class Parser {
  parseData(regexs, inputText) {
    const totalRegexs = [...regexs, ',', ':'];

    const regex = new RegExp(`[${totalRegexs.join('')}]`);

    return inputText
      .split(regex)
      .filter((item) => item !== '') // 빈문자열 제거
      .map((item) => Number(item));
  }

  parseCustomRegex(regexs, inputText) {
    let inputResult = inputText;

    // 커스텀 구분자가 포함되는경우 양식대로 파싱
    regexs.forEach((regex) => {
      const splitType = `//${regex}\\n`;
      const splitedText = inputResult.split(splitType);
      inputResult = `${splitedText[0]}${regex}${splitedText[1]}`;
    });
    return inputResult;
  }
}
