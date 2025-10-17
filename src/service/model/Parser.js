export default class Parser {
  parseData(regxs, inputText) {
    const totalRegexs = [...regxs, ',', ':'];
    const regex = new RegExp(`[${totalRegexs.join('')}]`);
    return inputText.split(regex).map((item) => {
      if (item === '') return 0;
      return Number(item);
    });
  }
}
