export default class Parser {
  parseData(regxs, inputText) {
    const totalRegexs = [...regxs, ',', ':'];
    const regex = new RegExp(`[${totalRegexs.join('')}]`);

    return inputText
      .split(regex)
      .filter((item) => item !== '') // 빈문자열 제거
      .map((item) => Number(item));
  }
}
