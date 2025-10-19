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
    let result = inputText;
    const pattern = new RegExp(`//${regexs}\\n`, 'g');
    result = result.replace(pattern, '');
    return result;
  }
}
