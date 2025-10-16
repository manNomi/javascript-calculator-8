import Extraction from '../service/model/Extraction.js';
import Parser from '../service/model/Parser.js';
import inputView from '../view/InputView.js';
import outputView from '../view/OutputView.js';
import Number from '../service/model/Number.js';

export default class Controller {
  constructor() {
    this.extraction = new Extraction();
    this.parser = new Parser();
  }

  async run() {
    const input =
      await inputView.readLineMessage('덧셈할 문자열을 입력해 주세요.');
    const customRegexs = this.extraction.extractCustom(input);
    const parsedNumber = this.parser.parseData(customRegexs, input);
    const numbers = new Number(parsedNumber);
    outputView.printMessage(`결과 : ${numbers.getAddedNumbers()}`);
  }
}
