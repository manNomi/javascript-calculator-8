import Extraction from '../service/model/Extraction.js';
import Parser from '../service/model/Parser.js';
import inputView from '../view/InputView.js';
import outputView from '../view/OutputView.js';
import Number from '../service/model/Number.js';
import validate from '../service/validate/validate.js';

export default class Controller {
  constructor() {
    this.extraction = new Extraction();
    this.parser = new Parser();
  }

  async run() {
    try {
      const input =
        await inputView.readLineMessage('덧셈할 문자열을 입력해 주세요.');

      const { regexs, escapedRegexs } = this.extraction.extractCustom(input);

      validate.validateDelimiters(regexs);

      const parsingCustomText = this.parser.parseCustomRegex(input, regexs);

      validate.validateContinuousDelimiters(parsingCustomText, escapedRegexs);

      const parsedNumber = this.parser.parseData(
        parsingCustomText,
        escapedRegexs,
      );
      validate.validateNumbers(parsedNumber);
      const numbers = new Number(parsedNumber);
      await outputView.printMessage(`결과 : ${numbers.getAddedNumbers()}`);
    } catch (error) {
      await outputView.printMessage(error.message);
      throw new Error(error.message);
    }
  }
}
