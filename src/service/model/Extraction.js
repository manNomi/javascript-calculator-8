const regex = /\/\/(.*?)\\n/g;

export default class Extraction {
  extractCustom(inputText) {
    const matches = Array.from(inputText.matchAll(regex), (match) => match[1]);
    return {
      regexs: matches, // 원본
      esacpedRegexs: this.#escapeRegex(matches), // 이스케이프 (사용용)
    };
  }

  #escapeRegex(regexs) {
    return regexs.map((item) => item.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  }
}
