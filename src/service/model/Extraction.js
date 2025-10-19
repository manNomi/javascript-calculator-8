const regex = /\/\/(.*?)\\n/g;

export default class Extraction {
  extractCustom(inputText) {
    const matches = Array.from(inputText.matchAll(regex), (match) => match[1]);
    return matches;
  }
}
