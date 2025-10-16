import { Console } from '@woowacourse/mission-utils';
import Controller from '../src/controller/Controller.js';

jest.mock('../src/view/InputView', () => ({
  default: {
    readLineMessage: jest.fn(() => ''),
  },
}));

describe('Controller 클래스 E2E 테스트', () => {
  it('입력 : 1,2:3 | 출력 : 결과 : 6', () => {
    const controller = new Controller();
    controller.run();
    const logSpy = jest.spyOn(Console, 'print').mockImplementation(() => {});
    expect(logSpy).toBe('결과 : 6');
  });
});
