import inputView from './view/InputView.js';
import outputView from './view/OutputView.js';

class App {
  async run() {
    const input = inputView.readLineMesage('Hello World');

    outputView.printMessage(input);
  }
}

export default App;
