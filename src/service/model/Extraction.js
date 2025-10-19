const regex = /\/\/(.*?)\\n/g;

export default class Extraction {
  extractCustom(inputText) {
    const matches = Array.from(
      inputText.matchAll(regex),
      (match) => match[1],
    ).map((item) => this.#escapeForCharClass(item));
    return matches;
  }

  // 정규 문자열이 포함되는 경우 대비
  #escapeForCharClass(char) {
    return char.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }
}
