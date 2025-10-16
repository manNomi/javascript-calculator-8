import { Console } from '@woowacourse/mission-utils';

const outputView = {
  async printMessage(message) {
    await Console.print(message);
  },
};
export default outputView;
