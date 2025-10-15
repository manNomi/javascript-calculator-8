const regex = /\/\/(.*?)\\n/;

export default class Extraction {
  extractCustom(inputText) {
    const match = inputText.match(regex);
    if (match) {
      return [match[1]];
    }
    return [];
  }
}
