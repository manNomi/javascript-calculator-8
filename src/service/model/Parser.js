export default class Parser {
  parseData(regexs, inputText) {
    let inputResult = inputText;

    // 커스텀 구분자가 포함되는경우 양식대로 파싱
    regexs.forEach((regex) => {
      const splitType = `//${regex}\\n`;
      const splitedText = inputResult.split(splitType);
      inputResult = `${splitedText[0]}${regex}${splitedText[1]}`;
    });

    const totalRegexs = [...regexs, ',', ':'];
    const escapedRegexs = totalRegexs.map((regex) =>
      this.#escapeForCharClass(regex),
    );

    const regex = new RegExp(`[${escapedRegexs.join('')}]`);

    return inputResult
      .split(regex)
      .filter((item) => item !== '') // 빈문자열 제거
      .map((item) => Number(item));
  }

  #escapeForCharClass(char) {
    return char.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }
}
