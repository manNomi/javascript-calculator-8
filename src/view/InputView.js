import { Console } from '@woowacourse/mission-utils';

const inputView = {
  async readLineMesage(message) {
    const input = await Console.readLineAsync(message);
    return input;
  },
};
export default inputView;
