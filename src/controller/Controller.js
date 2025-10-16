import Extraction from '../service/model/Extraction.js';
import Parser from '../service/model/Parser.js';

export default class Controller {
  constructor() {
    const extraction = new Extraction();
    const parser = new Parser();
  }
}
