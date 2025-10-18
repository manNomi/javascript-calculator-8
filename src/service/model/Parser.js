export default class Parser {
  parseData(regexs, inputText) {
    let inputResult = inputText;

    // 커스텀 구분자가 포함되는경우 양식대로 파싱
    regexs.forEach((regex) => {
      const splitType = `//${regex}\\n`;
      inputResult = inputText.split(splitType).join('');
    });

    const totalRegexs = [...regexs, ',', ':'];
    const regex = new RegExp(`[${totalRegexs.join('')}]`);

    console.log(
      'inputResult',
      inputResult,
      inputResult.split(regex).filter((item) => item !== ''),
    );
    return inputResult
      .split(regex)
      .filter((item) => item !== '') // 빈문자열 제거
      .map((item) => Number(item));
  }
}
