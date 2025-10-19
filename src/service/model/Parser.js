export default class Parser {
  constructor(customRegexs) {
    this.customRegexs = customRegexs;
    this.customEsacpedRegexs = customRegexs.map((item) =>
      this.#escapeForCharClass(item),
    );
  }

  parseData(inputText) {
    const totalRegexs = [...this.customEsacpedRegexs, ',', ':'];
    const regex = new RegExp(totalRegexs.join('|'));
    return inputText
      .split(regex)
      .filter((item) => item !== '') // 빈문자열 제거
      .map((item) => Number(item));
  }

  parseCustomRegex(inputText) {
    let inputResult = inputText;

    this.customRegexs.forEach((regex) => {
      const splitType = `//${regex}\\n`;
      if (inputResult.startsWith(splitType)) {
        inputResult = inputResult.slice(splitType.length);
      }
    });

    return inputResult;
  }

  // 정규 문자열이 포함되는 경우 대비
  #escapeForCharClass(char) {
    return char.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }
}
